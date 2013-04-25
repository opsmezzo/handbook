Server roles can be managed from `baton` using `roles` resource:

``` bash
  baton roles <command>
```

### `baton roles create <name>`

Creates a role with the specified name. If no name is supplied you will be prompted for one

### `baton roles list <provider>`

Lists all roles managed by conservatory

### `baton roles delete <name>`

Attempts to delete the role with the specified `name` from conservatory

### `baton roles view <name>`

Views all servers in the specified role

### `baton roles test <name>`

Tests to see if all servers with the specified role are currently running

[meta:title]: <> (images: Images management)