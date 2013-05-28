There are various local configuration values that you should be aware of when working with `quill`.

<hr>

## Available commands

Working with local config in `quill` is just like working with local config in `baton` or `jitsu` and is provided by [flatiron-cli-config][flatiron-cli-config].

```
quill conf
quill config list
quill config set <key> <value>
quill config get <key>
quill config delete <key>
```

To view all of the local configuration you can run `quill conf`

```
  $ quill conf
  info:    Welcome to quill
  info:    It worked if it ends with quill ok
  info:    Executing command conf
  help:    Hello indexzero here is your /Users/charlie/.quillconf file:
  help:    If you'd like to change a property try:
  help:    quill config set <key> <value>
  data:    
  data:    {
  data:        userconfig: '/Users/Charlie/.quillconf',
  data:        password: '********'
  data:        directories: {
  data:            env: '/Users/Charlie/.quill/env',
  data:            ssh: '/Users/Charlie/.ssh',
  data:            tmp: '/Users/Charlie/.quill/tmp',
  data:            cache: '/Users/Charlie/.quill/cache',
  data:            root: '/Users/Charlie/.quill',
  data:            install: '/Users/Charlie/.quill/installed'
  data:        },
  data:        username: 'indexzero',
  data:        remoteHost: 'ip.of.your.composer',
  data:        port: 9003
  data:    }
  data:    
  info:    quill ok
```

<hr>

## Config Settings

### directories

* ssh
* install
* cache
* tmp

### remoteHost

### port

### template

### dry

### colors

### username

### password

[flatiron-cli-config]: https://github.com/flatiron/cli-config
[meta:title]: <> (Quill configuration)