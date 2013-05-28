`quill` is a configuration and system management tool. It is easy to think of it as an "operating system agnostic package manager".

<img src="/img/screenshots/quill.png" />

<hr>

### Learn more

* [Basic Usage](#usage)
* [Common Aliases](/quill/aliases)
* [Updating Systems](/quill/updating-systems)
* Resources
  * [Keys](/quill/resources/keys)
  * [Systems](/quill/resources/systems)
  * [Config](/quill/resources/config)

<hr>

<a name="usage"></a>
## Basic Usage

`quill` is a robust and fully-featured configuration toolset with a simple convention for executing commands:

``` bash
  $ quill <resource> <command>
```

for example: 

``` bash
  $ quill systems list
```

will list all `system` Resources in your current registry. The tool itself is designed to be self documenting via the `quill help` command. For example to learn what the `systems list` command does:

``` bash
  $ quill help systems list
  info:   Welcome to quill
  info:   It worked if it ends with quill ok
  info:   Executing command help systems list
  help:   Lists all systems in the registry.
  help:   
  help:   quill list
  help:   quill systems list
  quill ok
```

[meta:title]: <> (Using quill)