_Configuration management_ refers to configuring a single system running on a remote server.

* [Configuration hierarchy](#hierarchy)
* [Using configuration in system.json files and scripts](#scripts-files)
  * [Setting environment variables in system.json scripts](#scripts)
  * [Templating system.json files](#files)
* [Configuration for remoteDependencies](#remote-dependencies)

<hr>
<a name="hierarchy"></a>
## Configuration hierarchy
The total configuration available to a system.json package is the combination of several levels of configuration hierarchy. The priority of this hierarchy (from highest priority to lowest) is:

```
  ├─ `quill --config [key]=[value] --config [name]`
  ├─ Group
  ├─ Role
  └─ System
```

So if a `key` is set in both the [named remote configuration][quill-config] specified by `quill --config [name]` **and** set by the [named remote configuration][quill-config] specified by the Group, **the value from `quill --config [name]` will be used.**

### 1. quill --config [key]=[value] --config [name]
The `--config` parameter when running any _lifecycle action_ in `quill`.

### 2. Group
[Named remote configuration][quill-config] set on a [group](/baton/resources/group). Group-specific settings (e.g. master API address, file server address or external service login credentials).

### 3. Role
[Named remote configuration][quill-config] set on a [role](/baton/resources/role). Role-specific settings (e.g. monitoring systems to enable on a host).

### 4. System
Default system-specified configuration set on the `system.json` file (e.g. default login password or config file name):

**system.json**

``` js
  {
    // ...
    "config": {
      "key": "value",
      "nested": {
        "keys": "are ok too."
      }
    }
  }
```

<hr>
<a name="scripts-files"></a>
## Using configuration in system.json files and scripts
For the purposes of configuring systems during a given _lifecycle-action_, `quill` supports two ways of injecting config values into files and scripts.

<a name="scripts"></a>
### Setting environment variables in system.json scripts
When running any scripts (Bash, etc) scripts for a _lifecycle-action_ `quill` passes the configuration into process via environment variables.

Following config:

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

when evaluated in the following script:

```
  echo "quill_database_host: $quill_database_host"
  echo "quill_database_port: $quill_database_port"
  echo "quill_database_auth_username: $quill_database_auth_username"
  echo "quill_database_quth_password: $quill_database_quth_password"
  echo "quill_value: $quill_value"

  #
  # These are also aliased to `q_*` for convenience.
  #
  echo "q_value: $q_value"
```

will output all of the configuration values as:

```
  quill_database_host: couch.internal.net
  quill_database_port: 5984
  quill_database_auth_username: user
  quill_database_auth_password: pass
  quill_value: 42
  q_value: 42
```

<a name="files"></a>
### Templating system.json files
Before executing lifecycle scripts, all files located under the `/templates` directory for a given system are templated accordingly to configuration fetched by `quill`.

File:

```
  host = {{ host }}
  port = {{ port }}

  username = {{ auth.username }}
  password = {{ auth.password }}
```

when configuration is:

``` js
  {
    host: 'couch.internal.net',
    port: 5984,
    auth: {
      username: 'user',
      password: 'pass'
    }
  }
```

will be turned into:

```
  host = couch.internal.net
  port = 5984

  username = user
  password = pass
```

Then, lifecycle scripts can, for example, copy it to application-specific `/etc` directory:

```
  cp ../templates/template-name.conf /etc/file.conf
```

**Important:** If a configuration key is not found when attempting to template a file `quill` will respond with an error:

```
  error: Error running command install config
  error: Missing configuration value: nested in ~/.quill/installed/<system>/<version>/templates/<filename>
```

#### Array Indexing

`quill` also supports indexing into Arrays when templating files:

```
  hostname = {{ hosts.0 }}
```

when configuration is:

``` js
  {
    hosts: ['host0', 'host1', 'host2']
  }
```

will be turned into:

```
  hostname = host0
```

#### Dynamic configuration keys

Often you need to make decision at configure-time regarding which value in a larger [named remote configuration][quill-config] should be used. In other words, you want the key used to be dynamic. For example:

```
  hostname = {{ envs.{{ current }}.hostname }}
```

when configuration is:

``` js
  {
    current: 'production',
    envs: {
      production: { hostname: 'prod.mysite.com' }
      staging:    { hostname: 'staging.mysite.com' }
      test:       { hostname: 'test.mysite.com' }
    }
  }
```

will be turned into:

```
  hostname = prod.mysite.com
```

<a name="remote-dependencies"></a>
## Configuration for remoteDependencies

When a [system.json](/system-json) package has [remoteDependencies](/system-json/remote-dependencies), the information about servers which satisfy them is available for both `/scripts` and `/templates`.



[meta:title]: <> (Configuration management)