OpsMezzo instruments is built on-top of [Godot][godot] _adding reactor primitives for orchestrating cloud applications:_

<div style="text-align:center">
  <img style="margin: 0 0 0 50px;" src="/img/instruments-overview.png" />
  <br/><span>**Figure 1: High level Instruments architecture**</span>
</div>

OpsMezzo instruments adds reactors for handling common operations and monitoring tasks such as:

* **Network monitoring:** Concerned about network or HTTP latency? We've got you covered.
* **Server and application provisioning:** Wouldn't you like to just scale your app instead of _telling your ops team to scale your app?_
* **SSH:** Run arbitrary processes on demand to respond to incidents.
* **Process monitoring:** Notify your team through alerting tools when crashes occur.

<hr>
  * [Configuring Instruments Agents](/instruments/agents)
  * [Predefined Metrics &amp; Events](/instruments/metrics)
  * [High Performance Multiplexing](/instruments/multiplexing)
  * [Understanding Streams](/instruments/streams)
  * [Writing Custom Instrument Reactors](/instruments/reactors)
<hr>

## 

Lets consider how the above example, _emailing your ops team on high CPU load_, could be handled with Instruments:

<div style="text-align:center">
  <img style="margin: 0 0 0 50px;" src="/img/instruments-email.png" />
  <br/><span>**Figure 3: Data-flow for emailing your ops team on high CPU load**</span>
</div>

Automating these common tasks frees up your developers and operations engineers to handle higher-level more important problems like **building your application and your business.**

[godot]: /instruments/godot

[meta:title]: <> (Monitoring with Instruments)