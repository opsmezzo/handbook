"Bootstrapping" a server refers to:

1. Installing `quill`, dependent, and os specific systems.
2. Installing (but not applying configuration or starting services) all systems for a given role.   

Servers are created and/or bootstrapped in `baton` via `baton servers create*`. Each of these commands creates a server within a group for a single IaaS provider.

<img src="/img/baton-bootstrapping.png" />

## Common options
```
  --name       Server name
  --flavor-id  Size of the server (e.g. 256MB RAM)
  --image-id   Image to use on the server (e.g. Ubuntu 11.10)
  --group      Group name server will be placed into
```

## baton servers createimage

Creates and bootstraps a server: `quill` and dependent systems are installed to the new VM via `scp` and `ssh`. _No configuration is applied_

**Options**
```
  --role  Role of the server created
```

## baton servers create

Creates a server from a bootstrapped image (see: `baton servers createimage`). No files are directly copied, but any systems for the `role` provided are _installed, configured, and started_

```
  --role    Role of the server created
  --prepare Bootstraps the server without relying on image being bootstrapped
```

## baton servers createbatch

Executes `baton servers create` multiple times.

Creates a given number of servers from a bootstrapped image (see: `baton servers createimage`). No files are directly copied, but any systems for the `role` provided are _installed, configured, and started_

```
  --role         Role of the server created
  --batch-size   Number of servers to create concurrently
  --batch-length Total number of servers to create
```

## baton servers createraw

Creates a server with no additional files or script executions: plain 'ol vanilla server image. 


[meta:title]: <> (Bootstrapping Servers)