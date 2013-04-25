`baton` is an orchestration tool with a focus on automation and infrastructure opacity.

![Baton screenshot](/img/screenshots/baton.png)

<hr>
### Learn more

* [Basic Usage](#usage)
* [Common Aliases](/baton/aliases)
* [Bootstrapping](/baton/bootstrapping)
* [SSH Keys](/baton/ssh-keys)
* [Resources](/baton/resources)

<hr>
<a name="usage"></a>
## Basic Usage

`baton` is a robust and fully-featured orchestration toolset with a simple convention for executing commands:

``` bash
  $ baton <resource> <command>
```

for example:

``` bash
  $ baton groups list
```

will list all `group` resources in your current cloud setup. It is designed to be self documenting via the `baton help` command. For example to learn what the `groups list` command does:

``` bash
  $ baton help groups list
  info:   Welcome to baton
  info:   It worked if it ends with baton ok
  info:   Executing command help groups list
  help:   Lists all groups managed by conservatory.
  help:
  help:   baton groups list
  help:   baton groups list <provider>
  baton ok
```

[meta:title]: <> (Using baton)