Godot is a monitoring solution that met our needs of:

* Able to handle thousands of messages per second.
* Scaling to accommodate the dynamic needs of thousands of applications.
* Flexibility to make decisions based on various criteria.

The events that `godot` processes are simple JSON, with a single `metric` property representing _a single numeric value for the event._

```
{
  host:         "A hostname, e.g. 'api1', 'foo.com'"
  service:      "e.g. 'API port 8000 reqs/sec'",
  state:        "Any string less than 255 bytes, e.g. 'ok', 'warning', 'critical'",
  time:         "The time of the event, in unix epoch seconds",
  description:  "Freeform text",
  tags:         "Freeform list of strings, e.g. ['rate', 'fooproduct', 'transient']"
  meta:         "Freeform set of key:value pairs e.g. { 'ewma': 12345 }",
  metric:       "A number associated with this event, e.g. the number of reqs/sec."
  ttl:          "A floating-point time, in seconds, that this event is valid for."
}
```

## Introducing Godot

Lets jump right in. A common use-case for monitoring is ensuring that everything is still running using [heartbeats][heartbeat]. In `godot` you just need to declare _a client to send heartbeats and a server to ensure heartbeats are received._

Both of these operations can be done **in a single line of Javascript.** First lets focus on the server:

**server.js**
```
var godot = require('godot');

//
// Reactor server which will email `user@host.com`
// whenever any service matching /.*\/health\/heartbeat/
// fails to check in after 60 seconds.
//
godot.createServer({
  //
  // Defaults to tcp
  //
  type: 'tcp',
  reactors: [
    godot.reactor()
      .where('service', '*/health/heartbeat')
      .expire(1000 * 60)
      .email({ to: 'user@host.com' })
  ]
}).listen(9876);
```

Now that the server is listening for connections from heartbeat clients, lets create a client to start sending messages.

**client.js**
```
var godot = require('godot');

//
// Producer client which sends events for the service
// `app.server/health/heartbeat` every 15 seconds.
//
godot.createClient({
  //
  // Defaults to TCP
  //
  type: 'tcp',
  producers: [
    godot.producer({
      host: 'app.server.com'
      service: 'app.server/health/heartbeat',
      ttl: 1000 * 15
    })
  ]
}).connect(9876);
```

Both the `.createClient` and the .`createServer` methods of `godot` accept **multiple producers and reactors** _(respectively)_ allowing you to compose complex behavior from multiple simple streams.

<img style="margin: 0 0 0 150px;" src="/img/godot-overview.png" />
<br/><span style="margin-left:170px">**Figure 1: High-level Godot Architecture**</span>

Lets examine the dataflow of a simple reactor that sends `ops@host.com` an email whenever the CPU load of a server goes above 50%.

```js
godot.reactor()
  .where('service', 'cpu')
  .over(50)
  .email({ to: 'ops@host.com' });
```

<img style="margin: 0 0 0 50px;" src="/img/email-flow.png" />
<br/><span style="margin-left:170px">**Figure 2: Data-flow for sending email on high CPU load**</span>

This is obviously _very naive_ and you should probably perform somekind of [exponentially decaying moving average][ewma] to avoid false-positives on short-lived spikes (`godot` has EWMA built-in via the [window-stream][window-stream] module).

```js
var windowStream = require('window-stream'),
    godot = require('godot');

var M1_ALPHA = 1 - Math.exp(-5/60);

godot.reactor()
  .where('service', 'cpu')
  .movingAverage({
    average: {
      type: 'exponential',
      alpha: M1_ALPHA
    },
    window: new windowStream.EventWindow({ size: 10 })
  })
  .over(50)
  .email({ to: 'ops@host.com' });
```

## Performance

Before writing this, I noticed a recent post from [aphyr][200k-second] (the author of Riemann) discussing in intimate detail how he has achieved _200k messages per second in Riemann._ This intrigued me to see just how this little node program stacked up:

```
node test/perf/pummel.js -c 5
Starting performance test with:
  network protocol  tcp
  concurrency:      5
  sampling interval 10s
  duration:         10s
  ttl:              0
  port:             10557

Starting reactor 1
Starting producer 1
Starting producer 2
Starting producer 3
Starting producer 4
Starting producer 5

Now receiving messages...

Received:
  1069482 total messages
  106948.2 per second
```

So _with little or no attention paid to performance_ we're already processing **100k messages per second in node.** This makes sense because this sort of IO bound application is exactly what node.js was designed for. I suspect (but have not yet had the time to investigate) that this 100k / second benchmark could be faster because it is deficient in several places:

1. Single reactor process: the underlying sockets are not shared between multiple processes.
2. Not distributed: this benchmark was both producing and consuming data from the same machine, so there would be plenty of spare CPU if the messages were produced on a second machine.
3. No framing: As aphyr points out, combing multiple messages into a single TCP packet can greatly increase network throughput, I'm eager to try this out.

[godot]: https://github.com/nodejitsu/godot
[cep]: http://en.wikipedia.org/wiki/Complex_event_processing
[riemann-source]: https://github.com/aphyr/riemann/blob/master/src/riemann/streams.clj#L550-L592
[nodejs]: http://nodejs.org
[heartbeat]: http://en.wikipedia.org/wiki/Heartbeat_network
[200k-second]: http://aphyr.com/posts/269-reaching-200k-events-sec
[ewma]: http://en.wikipedia.org/wiki/Exponential_smoothing#The_exponential_moving_average
[window-stream]: https://github.com/indexzero/window-stream

[meta:title]: <> (Writing Custom Reactors)
