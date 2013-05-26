Remote configuration can be managed from `quill` using `remote` resource:

``` bash
  quill remote <command>
```

<hr/>

## Modifying remote configuration

### `quill remote create <name>`
Create a remote config instance.

### `quill remote load <name> <file>`
Load data from JSON file `<file>` into remote config named `<name>` (best for
more advanced operations).

### `quill remote merge <name> <file>`
Merges data from JSON file `<file>` into remote config named `<name>` (best for
more advanced operations).

### `quill remote delete <name>`
Delete remote config.

### `quill remote set <name> <key> <value>`
Set value of `<key>` to `<value>` in remote config named `<name>`.

### `quill remote clear <name> <key>`
Remove key `<key>` from remote config named `<name>`.

<hr/>

## Viewing remote configuration

### `quill remote list`
List remote configs.

### `quill remote view <name>`
View a named remote config.

### `quill remote get <name> <key>`
Get value of `<key>` from remote config named `<name>`.

[meta:title]: <> (remote: Remote Configuration)