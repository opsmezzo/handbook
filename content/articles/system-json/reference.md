This document is all you need to know about what's required in your `system.json` file. It must be actual JSON, not just a JavaScript object literal.

A lot of the behavior described in this document is affected by the config settings described in config for [`baton`](/baton/config) and [`quill`](/quill/config).

* [`name`](#properties/name)
* [`version`](#properties/version)
* [`description`](#properties/description)
* [`dependencies`](#properties/dependencies)
* [`remoteDependencies`](#properties/remoteDependencies)
* [`runlist`](#properties/runlist)
* [`os`](#properties/os)
* [`config`](#properties/config)
* [`keywords`](#properties/keywords)
* [`homepage`](#properties/homepage)
* [`bug`](#properties/bugs)
* [`contributors`](#properties/people), [`author`](#properties/people)
* [`repository`](#properties/repository)

<hr>
<a name="properties/name"></a>
### name

The *most* important things in your system.json are the name and version fields. Those are actually required, and your system won't install without them. The name and version together form an identifier that is assumed
to be completely unique. Changes to the system should come along with changes to the version.

The name is what your thing is called. Some tips:

* Don't put "system" in the name. It's assumed that it's a system, since you're
  writing a system.json file.
* The name ends up being part of a URL, an argument on the command line, and a
  folder name. Any name with non-url-safe characters will be rejected.
  Also, it can't start with a dot or an underscore.

<hr>
<a name="properties/version"></a>
### version

The *most* important things in your system.json are the name and version fields. Those are actually required, and your system won't install without them. The name and version together form an identifier that is assumed to be completely unique. Changes to the system should come along with changes to the version.

Version must be parseable by [node-semver](https://github.com/isaacs/node-semver), which is bundled with `quill` as a dependency.

Here's how quill's semver implementation deviates from what's on semver.org:

* Versions can start with "v"
* A numeric item separated from the main three-number version by a hyphen will be interpreted as a "build" number, and will *increase* the version. But, if the tag is not a number separated by a hyphen, then it's treated as a pre-release tag, and is *less than* the version without a tag. So, `0.1.2-7 > 0.1.2-7-beta > 0.1.2-6 > 0.1.2 > 0.1.2beta`

This is a little bit confusing to explain, but matches what you see in practice when people create tags in git like "v1.2.3" and then do "git describe" to generate a patch version.

<hr>
<a name="properties/description"></a>
### description

Put a description in it. It's a string. This helps people discover your system, as it's listed in `quill list`.

<hr>
<a name="properties/dependencies"></a>
### dependencies

Dependencies are specified with a simple hash of system name to version range. The version range is EITHER a string which has one or morespace-separated descriptors, OR a range like "fromVersion - toVersion"

Version range descriptors may be any of the following styles, where "version" is a semver compatible version identifier.

* `version` Must match `version` exactly
* `=version` Same as just `version`
* `>version` Must be greater than `version`
* `>=version` etc
* `<version`
* `<=version`
* `~version` See 'Tilde Version Ranges' below
* `1.2.x` See 'X Version Ranges' below
* `http://...` See 'URLs as Dependencies' below
* `*` Matches any version
* `""` (just an empty string) Same as `*`
* `version1 - version2` Same as `>=version1 <=version2`.
* `range1 || range2` Passes if either range1 or range2 are satisfied.
* `git...` See 'Git URLs as Dependencies' below

For example, these are all valid:

``` js
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x"
  }
}
```

#### Tilde Version Ranges

A range specifier starting with a tilde `~` character is matched against a version in the following fashion.

* The version must be at least as high as the range.
* The version must be less than the next major revision above the range.

For example, the following are equivalent:

* `"~1.2.3" = ">=1.2.3 <1.3.0"`
* `"~1.2" = ">=1.2.0 <2.0.0"`
* `"~1" = ">=1.0.0 <2.0.0"`

#### X Version Ranges

An "x" in a version range specifies that the version number must start with the supplied digits, but any digit may be used in place of the x.

The following are equivalent:

* `"1.2.x" = ">=1.2.0 <1.3.0"`
* `"1.x.x" = ">=1.0.0 <2.0.0"`
* `"1.2" = "1.2.x"`
* `"1.x" = "1.x.x"`
* `"1" = "1.x.x"`

You may not supply a comparator with a version containing an x. Any digits after the first "x" are ignored.

<hr>
<a name="properties/runlist"></a>
### runlist

The key difference between language package managers like `npm` and OS package managers like `apt` is that **order matters.** The runlist property (similar to Chef) specifies the order in which `dependencies` should be installed.

It should be an array of keys in the `dependencies` property:

``` js
{
  "dependencies": {
    "redis": "1.0.0",
    "ubuntu-base": "1.0.0"
  },
  "runlist": ["ubuntu-base", "redis"]
}
```

#### Implicit runlists

No `runlist` property is necessary in the case when your system only has one dependency. In this case the `runlist` is implicit to be only that single dependency.

<hr>
<a name="properties/os"></a>
### os


<hr>
<a name="properties/remoteDependencies"></a>
### remoteDependencies
Remote dependencies are specified with a simple hash of system name to version range. The version range is EITHER a string which has one or morespace-separated descriptors, OR a range like "fromVersion - toVersion". They specify systems running on remote servers.
Detailed description of remote dependencies is available [here](/system-json/remote-dependencies).

<hr>
<a name="properties/config"></a>
### config

A "config" hash can be used to set configuration parameters used in system scripts that persist across upgrades. For
instance, if a package had the following:

``` js
{
  "name": "foo",
  "config" : { "port": "8080" }
}
```

and then had a "start" command that then referenced the `npm_system_config_port` environment variable, then the user could override that by doing `npm config set foo:port 8001`.

<hr>
<a name="properties/keywords"></a>
### keywords

Put keywords in it. It's an array of strings. This helps people discover your system.

<hr>
<a name="properties/homepage"></a>
### homepage

The url to the project homepage.

<hr>
<a name="properties/bugs"></a>
### bugs

The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your system.

It should look like this:

``` js
{
  "url": "http://github.com/owner/project/issues",
  "email": "project@hostname.com"
}
```

You can specify either one or both values. If you want to provide only a url, you can specify the value for "bugs" as a simple string instead of an object.

<hr>
<a name="properties/people"></a>
### people fields: author, contributors

The "author" is one person. "contributors" is an array of people. A "person" is an object with a "name" field and optionally "url" and "email", like this:

``` js
{
  "name": "Barney Rubble",
  "email": "b@rubble.com",
  "url": "http://barnyrubble.tumblr.com/"
}
```

Or you can shorten that all into a single string, and npm will parse it for you:

``` js
{
  "author": "Barney Rubble <b@rubb.com> (http://barn.rubb.com/)"
}
```

Both email and url are optional either way.

<hr>
<a name="properties/repository"></a>
### repository

Specify the place where your code lives. This is helpful for people who want to contribute.

Do it like this:

``` js
"repository": {
  "type": "git",
  "url": "http://github.com/isaacs/npm.git"
}
```

``` js
"repository": {
  "type": "svn",
  "url": "http://v8.googlecode.com/svn/trunk/"
}
```

The URL should be a publicly available (perhaps read-only) url that can be handed directly to a VCS program without any modification. It should not be a url to an html project page that you put in your browser. It's for computers.

```
Remarks: Adapted from npm under MIT.
```

[meta:title]: <> (system.json Reference)
