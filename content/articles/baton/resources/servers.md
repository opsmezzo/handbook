Servers can be managed from `baton` using `servers` resource:

``` bash
  baton servers <command>
```

Help for `baton servers` commands can be found by running `baton help servers`:

```
$ baton help servers
info:    Welcome to baton
info:    It worked if it ends with baton ok
info:    Executing command help servers
help:    `baton servers *` commands work with raw and managed server resources
(...)
```

#### Learn more

* [Create Servers](#create-servers)
* [Bootstraping Servers](/baton/bootstrapping)
* [Destroy Servers](#destroy-servers)
* [Run commands on Servers](#run-commands-on-servers)
* [Query Servers](#query-servers)

<hr/>

## Create servers

### `baton servers create`

Creates a server in the target environment with the name and role specified by prompt

`--prepare` Bootstraps the server without relying on image being bootstrapped

### `baton servers createimage`

Creates an image server in the target environment with the name and role specified by prompt

### `baton servers createraw`

Creates a raw server (i.e. no pre-installed systems) with the image and flavor provided by prompt or arguments.

``` bash
--name       Server name
--group      Group server belongs to
--image-id   Server Image Id
--flavor-id  Server Flavor Id
--insert     Forces insertion of raw server into Conservatory
```

<hr/>

## Destroy Servers

### `baton servers delete <id>`

Delete a server from the specified environment

`--ignoredb`   ignore errors when deleting the server from CouchDB

<hr/>

## Run commands on Servers

### `baton servers bootstrap`

Bootstraps a server with all of quill's dependencies

### `baton servers run`

Runs the commands specified on all servers with the target role in target environment

<hr/>

## Query Servers

### `baton servers listraw`

Lists all servers in the specified environment by contacting the IaaS service provider directly

### `baton servers listraw <pattern>`

Same as `listraw` but with given Regex pattern for filtering

### `baton servers view <id>`

Views the details for the server with the specified `id`

### `baton servers rename <id> <name>`

Renames a server with given `id

[meta:title]: <> (servers: Servers management)