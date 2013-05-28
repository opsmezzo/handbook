There are various local configuration values that you should be aware of when working with `baton`.

<hr>

## Available commands

Working with local config in `baton` is just like working with local config in `quill` or `jitsu` and is provided by [flatiron-cli-config][flatiron-cli-config].

```
baton conf
baton config list
baton config set <key> <value>
baton config get <key>
baton config delete <key>
```

To view all of the local configuration you can run `baton conf`

```
  $ baton conf
  info:    Welcome to baton
  info:    It worked if it ends with baton ok
  info:    Executing command conf
  help:    Hello indexzero here is your /Users/charlie/.batonconf file:
  help:    If you'd like to change a property try:
  help:    baton config set <key> <value>
  data:    
  data:    {
  data:        userconfig: '/Users/Charlie/.batonconf',
  data:        password: '********'
  data:        directories: {
  data:            config: '/Users/Charlie/.baton',
  data:            tmp: '/Users/Charlie/.baton/tmp',
  data:            keys: '/Users/Charlie/.ssh',
  data:            env: '/Users/Charlie/.baton/env',
  data:            bootstrap: '/Users/Charlie/.baton/bootstrap'
  data:        },
  data:        composer: { host: 'ip.of.your.composer', port: '9003' },
  data:        username: 'indexzero',
  data:        remoteHost: 'ip.of.your.conservatory',
  data:        port: 9003,
  data:        bootstrap: { runOnError: true }
  data:    }
  data:    
  info:    baton ok
```

<hr>

## Config Settings

### colors
  * Default: `true`
  * Type: Boolean

Show colored output

### concurrency
  * Default: 75
  * Type: Number

The concurrency with which to run SSH on servers

### remoteHost
  * Default: localhost
  * Type: String

The provisioner API endpoint

### port
  * Default: 9003
  * Type: Number

The port of the provisioner API endpoint

### username
  * Default: None
  * Type: String

The username to connect to provisioner

### password
  * Default: None
  * Type: String

The password to connect to provisioner

### tunnel
  * Default: None
  * Type: String

The SSH tunnel to connect to the servers

### debug
  * Default: true
  * Type: Boolean

Enable Debug logging

### keyname
  * Default: `id_rsa`
  * Type: String
  
Name of the default private key to use for SSH connections.

### userconfig
  * Default: '.batonconfig'
  * Type: String

The user configuration file

### composer

When bootstrapping servers, `baton` requires a valid composer server.

* **composer:host** _(Default: None)_ Remote host of the composer server.
* **composer:port** _(Default: 9003)_ Port of the remote composer server.

### ssl

* **ssl:cert** _(Default: None)_ Location of the client SSL certificate to use when making requests to the remote `conservatory` or `composer` servers.
* **ssl:key** _(Default: None)_ Location of the client SSL key to use when making requests to the remote `conservatory` or `composer` servers.

### bootstrap

When bootstrapping servers there are several configuration values available to you

* **bootstrap:runOnError** _(Default `false`)_ 
If set to `true` will not delete a given server if there is an error when bootstrapping.
* **bootstrap:user** _(Default: varies by provider)_
Remote user to use when SSHing into servers to bootstrap them.
* **bootstrap:keys** _(Default `~/.ssh/id_rsa`)_
Location of the SSH keys to use when bootstrapping servers
* **bootstrap:poll:interval** _(Default: `30000`)_
Interval to use when polling to get an active SSH connection during the bootstrap process.
* **bootstrap:poll:max** _(Default: `10`)_
Number of SSH polling attempts to make before marking a bootstrapped server as errored.

### directories

The directories used to store/retrieve extra configuration

* **directories:keys** _(Default: `~/.ssh`)_
* **directories:config** _(Default: `~/.baton`)_
* **directories:bootstrap** _(Default: `~/.baton/bootstrap`)_
* **directories:env** _(Default: `~/.baton/env`)_
* **directories:tmp** _(Default: `~/.baton/tmp`)_

[flatiron-cli-config]: https://github.com/flatiron/cli-config
[meta:title]: <> (Baton configuration)