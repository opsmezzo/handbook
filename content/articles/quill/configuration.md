`quill` can be used to perform configuration management tasks and used with `baton` when bootstrapping servers. _Configuration management_ refers to configuring a single system running on a remote server.

* [Managing configuration from quill](#managing)
* [baton and quill interaction](#baton-quill)
* [Using configuration in system.json files and scripts](#scripts-files)

<hr/>
<a name="managing"></a>
## Managing configuration from `quill`
Remote configuration can be managed from `quill` using `remote` resource:

``` bash
  quill remote <command>
```

To get started you'll want to create a remote named configuration:

``` bash
  quill remote load /path/to/config-file.json
```

Where `config-file.json` contains all of the nested configuration keys and values:

``` js
  {
    database: {
      host: 'couch.internal.net',
      port: 5984,
      auth: {
        username: 'user',
        password: 'pass'
    },
    value: 42
  }
```

You can more granularly manipulate remote configurations through [**_quill remote_** commands](/quill/resources/remote).

### Specifying configuration during a _lifecycle-action_
Config can be specified when running each action separately. There are two ways, both of which use the `--config` option when running `quill <lifecycle-action>`:

```
  quill --config <key>=<value> <lifecycle-action>
```

which simply sets `<key>` to `<value>`, and

```
  quill --config <name> <lifecycle-action>
```

which loads config called `<name>` from the [composer](/conservatory/composer).

<hr/>
<a name="baton-quill"></a>
## `baton` and `quill` interaction
When bootstrapping a server, `baton` executes `quill` on the remote machine, using `--config` parameters to load configurations for group, role and system from provisioner. e.g.

```
  baton servers create --config highest-priority-config-to-use [...]
```

<hr/>
<a name="scripts-files"></a>
## Using configuration in system.json files and scripts
For the purposes of configuring systems during a given _lifecycle-action_, `quill` supports two ways of injecting config values into files and scripts.

* [Setting environment variables in system.json scripts](/system-json/configuration#scripts)
* [Templating system.json files](/system-json/configuration#files)

[meta:title]: <> (Working with configuration)
