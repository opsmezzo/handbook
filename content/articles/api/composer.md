<a name="systems"></a>
## Systems

```
/systems
```

**GET** Returns a list of all systems

<hr/>

```
/systems/:system-name
```

**GET** Returns the informations about the system named `system-name`

**POST** Creates a new system

**PUT** Adds a version to the system named `system-name`

**DELETE** Deletes the corresponding system (**this action cannot be undone**)

<hr/>

```
/systems/:system-name/owners
```

**PUT** Adds to the `system-name` maintainers the users specified in the body

**DELETE** Removes from the `system-name` maintainers all the users specified in the body

<hr/>

```
/systems/:system-name/:version
```

**DELETE** Removes the version details for the `system-name`

**PUT** Adds the attached tarball to the `system-name` and `version`

**GET** Returns the tarball for the specified `system-name` and `version`

<hr/>

<a name="config"></a>
## Config

```
/config

```

**GET** Lists all configs

<hr/>

```
/config/:id
```

**GET** Returns details for config with the specified `id`

**POST** Creates a new config

**DELETE** Removes the config with the specified `id`

<hr/>

```
/config/:id/path/to/key
```

**PUT** Sets the JSON body in the settings value of the environment with the specified `id`

**DELETE** Clears the key in the settings value of the environment with the specified `id` 

[meta:title]: <> (Composer API Reference)