Server groups across multiple providers can be managed from `baton` using `groups` resource:

``` bash
  baton groups <command>
```

### `baton groups create <name>`

Creates a group with the specified name. If no name is supplied you will be prompted for one.

### `baton groups list <provider>`

Lists all groups managed by conservatory

### `baton groups view <name>`

Views all servers in the specified group

### `baton groups delete <name>`

Attempts to delete the group with the specified `name` from conservatory

### `baton groups add <servers>`

Adds servers with or matching the <server-name>

### `baton groups set-tunnel <name>`

Sets the tunnel host for the group with <name>

[meta:title]: <> (groups: Groups management)