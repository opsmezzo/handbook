The goal of the `instrument` processors is to calculate and respond to various metrics about the health and network activity of running processes in both `Conservatory` and `Nodejitsu`. Many metrics can be viewed:

* **Nodejitsu**
  * Per drone
  * Averaged per App
* **Conservatory**
  * Per server
  * Averaged per Role

### Health metrics

Health metrics are the most basic metrics produced by our [low-memory godot agent](https://github.com/nodejitsu/estragon). All of these metrics can be viewed per drone / server or and averaged per App / Role. 

* CPU
* Free Memory
* Free Disk Space
* Heartbeat
* Uptime
* Total Restarts

### Network metrics

Network metrics come in two forms: 

* _Inbound HTTP:_ Those produced by our Load Balancers (see [balanceboard#godot](https://github.com/nodejitsu/balanceboard/compare/godot).
* _Outbound TCP:_ These are not currently captured, but could be handled by something like [node-pcap](https://github.com/mrannry/node_pcap). **This is not currently being considered.**

The metrics about _Inbound HTTP_ we will be tracking are:

* Number of Active Requests (i.e. [http/start](#request-start) - [http/end](#request-end))
* Total Requests (i.e. [http/start](#request-start))
* Total Requests by URL 
* Total Requests Completed (i.e. [http/end](#request-end))
* Total Requests Completed by URL
* Average Response Time (i.e. [http/response-time](#response-time))
* Average Response Time by URL

### Scaling criteria

The most important task performed by our processors is to decide when to scale a given application or role. There are more than one criteria which can cause a scale up or scale down transition. 

**Several of these metrics may need to be considered both on the average (across the App or Role) and on the individual host** The cannonical example of course is if a single host is misbehaving, but not experiencing load required to scale, we should recover the host, but not add additional hosts.

The criteria that must be taken into consideration are:

* Response Time
* Average Response Time
* CPU
* Average CPU
* Memory
* Average Memory

The basic approach for scaling is to borrow a concept used often in Finance: [Bollinger Bands](http://en.wikipedia.org/wiki/Bollinger_Bands)

![](http://f.cl.ly/items/0n0i3v2f1x0J1S112l1R/bollinger-bands.png)

The _Bollinger Band approach_ means that:

> If the metric value exceeds the EWMA of the N-period time window for the same metric by X standard deviations
> we should **scale up.** Conversely, if the metric value falls below the EWMA by Y standard deviations we should
> **scale down.**

There is also another important criteria that needs to be considered: since applications will by nature "load-up" (i.e. allocate memory when starting then settle into a steady state) we should only consider the EWMA criteria past a fixed threshold (memory or uptime).

### Global metrics

To give a better gestalt of what is going on an the entire Nodejitsu or Conservatory installation tracking of global metrics (that is, metrics aggregated across all hosts) will be provided:

* Total Global Requests
* Average Global Response Time
* Total Heartbeats
* Total Average Free CPU
* Total Average Free Memory

## Logs

Logs can be sent to godot reactors, with a single `{ metric: 1 }` where the description is the actual log message itself

``` js
  {
    "service": "logs/stdout",
    "description": "This is the actual log message",
    metric: 1
  }
```

``` js
  {
    "service": "logs/stderr",
    "description": "This is the actual log message",
    metric: 1
  }
```


## Health Messages

### Heartbeat

``` js
{
  "host":    "10.0.0.1"
  "service": "health/heartbeat"
  "metric":  1,
  "ttl":     60000,
  "meta":    {
    "uptime": 123456789, // milliseconds
    "pid":    "12345"
  }
}
```

### CPU

``` js
{
  "host":    "10.0.0.1"
  "service": "health/cpu"
  "metric":  30, // percentage
  "meta":    {
    "pid": "12345"
  }
}
```

### Memory

``` js
{
  "host":    "10.0.0.1"
  "service": "health/memory"
  "metric":  102400, // bytes
  "meta":    {
    "pid": "12345"
  }
}
```

## Network Messages

### Request start

``` js
{
  "host":        "10.0.0.1"
  "service":     "http/start"
  "description": "www.nodejitsu.com/paas",
  "metric":      1,
  "meta":        {
    "balancer": "165.225.130.241",
    "domain":   "www.nodejitsu.com",
    "port":     "8080",
    "url":      "/paas"
  }
}
```


### Request end

``` js
{
  "host":        "10.0.0.1"
  "service":     "http/end"
  "description": "www.nodejitsu.com/paas",
  "metric":      1,
  "meta":        {
    "balancer": "165.225.130.241",
    "domain":   "www.nodejitsu.com",
    "port":     "8080",
    "url":      "/paas"
  }
}
```

### Response time

``` js
{
  "host":        "10.0.0.1"
  "service":     "http/response-time"
  "description": "www.nodejitsu.com/paas",
  "metric":      108, // milliseconds
  "meta":        {
    "balancer": "165.225.130.241",
    "domain":   "www.nodejitsu.com",
    "port":     "8080",
    "url":      "/paas"
  }
}
```

[meta:title]: <> (Predefined Metrics & Events)