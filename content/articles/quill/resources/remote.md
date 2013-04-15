Remote configuration can be managed from `quill` using `remote` resource:

``` bash
  quill remote <command>
```

### `quill remote create <name>`
Create a remote config instance.

### `quill remote list`
List remote configs.

### `quill remote delete <name>`
Delete remote config.

### `quill remote view <name>`
View remote config.

### `quill remote get <name> <key>`
Get value of `<key>` from remote config named `<name>`.

### `quill remote set <name> <key> <value>`
Set value of `<key>` to `<value>` in remote config named `<name>`.

### `quill remote clear <name> <key>`
Remove key `<key>` from remote config named `<name>`.

### `quill remote load <name> <file>`
Load data from JSON file `<file>` into remote config named `<name>` (best for
more advanced operations).

[meta:title]: <> (remote: Remote Configuration)