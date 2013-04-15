<hr>

`system.json` is a _simple and hierarchical_ file format for describing OS-level (and OS agnostic) packages to be installed with [baton][baton] and [quill][quill]. It is based on the widely popular [`package.json`][package-json] specification used with [`node.js`][nodejs] and [`npm`][npm].

To learn more about the `system.json` format consider the material below:

* [Anatomy of a `system.json`](#anatomy)
* [Changes from `package.json`](#changes)
* [Ignoring files](#ignore)
* [Lifecycle of a System][lifecycle]
* [System configuration][system-config]
* [Examples][examples]
* [Full `system.json` Reference][reference]

<hr>

<a name="anatomy"></a>
## Anatomy of a `system.json`

Lets look at a simple `system.json` script for installing [Redis][redis]:

``` js
  {
    "name": "redis",
    "version": "1.0.0",
    "description": "Install redis with sane defaults",
    "keywords": ["redis", "nosql", "databases"],
    "author": "Nodejitsu Inc <info@nodejitsu.com>",
    "os": {
      "ubuntu": { "ubuntu-base": "0.1.x" }
    }
  }
```

Like _every system,_ the directory structure is as follows:

```
  /redis
    system.json
    /scripts
      install.sh
      configure.sh
      start.sh
    /files
      redis.conf
```

Each of the files under `/scripts` represents what to run for each [lifecycle action][lifecycle] for a given Redis server:

* All of these scripts will be run from inside that directory.
* Any [system configuration][system-config] will be passed to these scripts via environment variables prefixed with `quill_`.

All of the files under `/files` will be templated with any [system configuration][system-config] during the _configure lifecycle action._ This is to allow for reuse of configurable servers images. That is, to prevent the need to create new images each time a configuration setting is changed.

<hr>
<a name="changes"></a>
## Changes from `package.json`

The `system.json` focuses on adding several key properties to `package.json` for OS-level package management:

* `runlist`: The key difference between language package managers like `npm` and OS package managers like `apt` is that **order matters.** The runlist property (similar to Chef) specifies the order in which `dependencies` should be installed.
* `os`: This property allows `system.json` to be OS-agnostic. The `os` property is a set of dependencies to only install on a certain OS.

### Removed from `package.json`

There are also several properties which are removed since they are only applicable to node.js packages: `bundleDependencies`, `cpu`, `devDependencies`, `engines`, `engineStrict`, `files`, `main`, `optionalDependencies`, `preferGlobal`, `private`, `publishConfig`, `scripts`

There are also several npm convenience features which are not implemented but may be implemented in the future

* `bin` property
* `directories` property
  * `directories.bin`
  * `directories.man`
  * `directories.doc`
* `man` property
* Git URLs as Dependencies
* URLs as Dependencies

<hr>
<a name="ignore"></a>
## Ignoring files

When publishing a system.json, [quill][quill] will attempt to parse the `.quillignore` file in the system.json directory. If no `.quillignore` is found then [quill][quill] will fall back to a `.gitignore` file. e.g.

**.quillignore**

```
  *.swp
  .DS_Store
```

The above `.quillignore` file will ensure that files matching those patterns are not included when the system.json is published.

[baton]: /baton
[quill]: /quill
[lifecycle]: /system-json/lifecycle
[system-config]: /system-json/templating
[nodejs]: http://nodejs.org
[npm]: http://npmjs.org
[package-json]: https://github.com/isaacs/npm/blob/master/doc/cli/json.md
[examples]: /system-json/examples
[reference]: /system-json/reference
[redis]: http://redis.io

[meta:title]: <> (Working with system.json)