
```
  $ bin/composer

       ___  ____  _______ ____  ____  ____  ____  ____
      /    /   / /  /  / /___/ /   / /___  /___  /___/
     /___ /___/ /  /  / /     /___/ ____/ /___  /  \

                © 2010 Nodejitsu Inc.
        All Rights Reserved - www.nodejitsu.com

  composer has started successfully @ 192.168.1.106 on port 9004...
```

Composer exposes a RESTful backend for managing `Config`, and `Systems`. This is the backend for  [`quill`](/quill).

<hr>

<table class="fullref">
  <thead>
    <th>Resource</th>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>Systems</td>
    <td>`GET /systems`</td>
    <td>None</td>
    <td>Returns a list of all systems</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`GET /systems/:name`</td>
    <td>None</td>
    <td>Returns the informations about the system with `name`</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`POST /systems/:name`</td>
    <td>JSON</td>
    <td>Creates a new system.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`PUT /systems/:name`</td>
    <td>JSON</td>
    <td>Adds a version to the system with `name`.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`DELETE /systems/:name`</td>
    <td>None</td>
    <td>Deletes the corresponding system with `name`</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`PUT /systems/:name/owners`</td>
    <td>Array</td>
    <td>Adds the array of usernames to the maintainers of the system with `name`.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`DELETE /systems/:name/owners`</td>
    <td>Array</td>
    <td>Removes the array of usernames from the maintainers of the system with `name`.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`DELETE /systems/:name/:version`</td>
    <td>None</td>
    <td>Removes the `version` for the system with the specified `name`.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`PUT /systems/:name/:version`</td>
    <td>Tarball</td>
    <td>Adds the attached tarball to the `name` and `version`.</td>
  </tr>
  <tr>
    <td>Systems</td>
    <td>`GET /systems/:name/:version`</td>
    <td>None</td>
    <td>Returns the tarball for the specified `name` and `version`.</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`GET /config`</td>
    <td>None</td>
    <td>Returns a list of all configs</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`GET /config/:name`</td>
    <td>None</td>
    <td>Returns details for config with the specified `name`</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`POST /config/:name`</td>
    <td>JSON</td>
    <td>Creates a new config.</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`DELETE /config/:name`</td>
    <td>None</td>
    <td>Removes the config with the specified `name`</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`PUT /config/:name/path/to/key`</td>
    <td>JSON</td>
    <td>Sets the JSON body in the settings value of the environment with the specified `name`</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>`DELETE /config/:name/path/to/key`</td>
    <td>None</td>
    <td>Clears the key in the settings value of the environment with the specified `name`</td>
  </tr>
</table>

[meta:title]: <> (Composer API Reference)