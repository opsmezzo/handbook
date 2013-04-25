Images for use in various Iaas cloud providers can be managed from `baton` using `images` resource:

``` bash
  baton images <command>
```

### `baton images create <server-name>`

Creates an image in the current Iaas provider from the server with the specified server-name

### `baton images destroy <id>`

Destroys an image from the current IaaS provider with the specified id

### `baton images listraw`

Lists all images available by the current IaaS service provider

### `baton images listraw <pattern>`

Same as `listraw` but with given Regex pattern for filtering

### `baton images set`

Lists all images available by the current IaaS service provider, then prompts
the user for the image to use and the role to use the image for and sets the baton config value

### `baton images set <pattern>`

Same as `set` but with given Regex pattern for filtering

[meta:title]: <> (images: Images management)