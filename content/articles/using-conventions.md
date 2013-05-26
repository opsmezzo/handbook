_If you haven't already installed [baton and quill](/a-quickstart/installation) you should **do so now before continuing.**_
<hr/>

Both [`baton`][baton] and [`quill`][quill] use similar conventions to [`jitsu`][jitsu], the CLI tool for the Nodejitsu public cloud. So if you're familiar with [`jitsu`][jitsu], _you can probably skip this._

* [CLI Resources](#resources)
* [Common Aliases](#aliases)
* [Prompts and Overrides](#prompts)

<hr/>
<a name="resources"></a>
## CLI Resources

Similar to [`jitsu`][jitsu], all operations are broken up into logical resources which represent a set of actions on entities like `servers` or `systems`. 

```
  $ baton <resource> <command>
```

The list of common resources is displayed in the default help for both [`baton`][baton] and [`quill`][quill]:

<img src="/img/screenshots/baton.png" />
<img src="/img/screenshots/quill.png" />

The commands for any of these resources are listed in the help for that resource. In this way both `baton` and `quill` are designed to be self-documenting via the `baton help` command. For example to get help about `baton servers` just run `baton help servers`:

```
$ baton help servers
info:   Welcome to baton
info:   It worked if it ends with baton ok
info:   Executing command servers
help:   `baton servers *` commands work with raw and managed server resources
help:   
help:   baton servers create
help:   baton servers createimage
help:   baton servers createraw
help:   baton servers run
help:   baton servers test <role>
help:   baton servers listraw
help:   baton servers listraw <pattern>
help:   baton servers view <id>
help:   baton servers rename <id> <name>
help:   baton servers delete <id>
help:   
help:   Options:
(...)
```

_**Remark:** The above is equivalent to_ `baton servers --help` _or_ `baton servers -h`.

<hr/>
<a name="aliases"></a>
## Common Aliases

Most common operations have a short-hand or _alias._ For example to list all systems available with `quill` the following two commands are equivalent:

```
  $ quill systems list
  $ quill list
```

For a list of all aliases for `baton` and `quill` see the links below:

* [`baton` aliases](/baton/aliases)
* [`quill` aliases](/quill/aliases)

<hr/>
<a name="prompts"></a>
## Prompts and Overrides

Many of the commands in both `baton` and `quill` have additional CLI parameters. If these parameters are not provided you will be prompted to enter them.

Most commands display the available prompts in their CLI help.

[jitsu]: https://github.com/nodejitsu/jitsu
[baton]: /baton
[quill]: /quill

[meta:title]: <> (CLI Conventions)