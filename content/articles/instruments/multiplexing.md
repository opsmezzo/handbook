Information about hosts will come from two distinct places:

* _Load Balancers:_ will provide metrics about incoming HTTP requests.
* _Servers:_ will provider metrics about server and application (i.e. process) health

In order to make an informed decision about the state of an application or service a given `godot` processor **must know about all metrics for that application or service.** As such there are two ways this can be accomplished.

1. By having each processor forward messages it should not handle to the appropriate processor.
2. By having a distinct set of multiplexers that route messages appropriately. 

**(2) is preferred because it separates these concerns and reduces the complexity of the processors themselves.** Therefore the diagram below specifies the network throughput for processing `godot` messages. 

![](http://f.cl.ly/items/1q0M1I2I2N1O3u0Y2U0A/multiplexer.png)

The data flow for an indivdual metric in the diagram above is:

1. Metric is produced by a _Load Balancer_ or _Server_
  * Each balancers will produce events for many applications; the number of apps is non-deterministic
  * Each app host will produce events for a single drone that need to be aggregated for correct decisions.
2. Metric is routed to any multiplexer
  * Any producer can connect to any multiplexer and it will route it to the correct processor.
3. Metric is routed to the appropriate processor by the multiplexer using the [Service Registry](#service-registry)
  * Processors need to have all events for a single application in the same process.
4. Metric is processed and forward to long-term storage and any realtime listeners. 

## Service Registry

The _Service Registry_ required for our `godot` multiplexers is similar to the existing lookup tables used by `balanceboard`, but only requires lookup by `host`. Since these multiplexers will handle metrics for both `apps` (on [Nodejitsu](#nodejitsu)) and `systems` (on [Conservatory](#conservatory)) it will need to work with both databases.

Here's an example of what the data-structure for the _Service Registry_ will look like:

``` js
  {
    lookup: {
      //
      // Three hosts being routed to the same processor
      //
      "10.0.0.1": { host: "producer-3rt6.jit.su", port: 10556 },
      "10.0.0.2": { host: "producer-3rt6.jit.su", port: 10556 },
      "10.0.0.3": { host: "producer-3rt6.jit.su", port: 10556 }
    },
    uids: {
      "10.0.0.1": "indexzero/sudomakethought",
      "10.0.0.2": "indexzero/sudomakethought",
      "10.0.0.3": "indexzero/sudomakethought"
    },
    hosts: {
      "indexzero/sudomakethought": [
        "10.0.0.1",
        "10.0.0.2",
        "10.0.0.3"
      ]
    }
  }
```

### Nodejitsu

The lookup table for the _Service Registry_ can be calculated from `_design/App/_view/balancerInfo`.

### Conservatory

The lookup table for the _Service Registry_ can be calculated from `_design/Server/_view/all` and `_design/Role/_view/all`.

[meta:title]: <> (High Performance Monitoring)