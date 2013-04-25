Flavors in various IaaS providers can be managed from `baton` using `flavors` resource:

``` bash
  baton flavors <command>
```

### `baton flavors listraw`

Lists all flavors available by the current IaaS service provider

### `baton flavors listraw <pattern>`

Same as `listraw` but with given Regex pattern for filtering

### `baton flavors set`

Lists all flavors available by the current IaaS service provider, then prompts the user
for the flavor to use and the role to use the flavor for and sets the baton config value

### `baton flavors set <pattern>`

Same as `set`but with given regex pattern for filtering


[meta:title]: <> (flavors: Flavors management)