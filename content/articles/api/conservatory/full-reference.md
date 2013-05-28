
```
  $ ./conservatory/bin/provisioner 


          ___  ____ _   _  ___  ___  ___ _  __ ____ ____ ____  ___ _  __
         /    /   / /\  / /__  /_   /__/ |  / /___/  /  /   / /__/ /__/
        /___ /___/ /  \/ ___/ /__  /  \  |_/ /   /  /  /___/ /  \  /

        © 2010 Nodejitsu Inc.
        All Rights Reserved - www.nodejitsu.com


  conservatory has started successfully as provisioner @ 127.0.0.1 on port 9003...
```

Conservatory exposes a RESTful backend for managing `Servers`, `Roles`, and `Groups`. This is the backend for  [`baton`](/baton). **This is all RESTful routes for all resources for this API.**

<hr>

<table class="fullref">
  <thead>
    <th>Resource</th>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>Servers</td>
    <td>`GET /servers`</td>
    <td>None</td>
    <td>Returns a list of all servers.</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`GET /servers/:id`</td>
    <td>None</td>
    <td>Returns the informations about the server with `id`.</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`POST /servers/:id`</td>
    <td>JSON</td>
    <td>Adds an existing server to conservatory. **Will not provision from your IaaS provider.**</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`PUT /servers/:id`</td>
    <td>JSON</td>
    <td>Updates the server with the specified `id`.</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`DELETE /servers/:id`</td>
    <td>None</td>
    <td>Removes a server from conservatory. **Will not remove the server from your IaaS provider.**</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`POST /servers/tagged`</td>
    <td>JSON</td>
    <td>Returns a list of all servers with the specified `body.tags`.</td>
  </tr>
  <tr>
    <td>Servers</td>
    <td>`POST /servers/uid`</td>
    <td>JSON</td>
    <td>Returns the unique identifier for the server information.</td>
  </tr>
  <tr>
    <td>Clusters</td>
    <td>`GET /clusters/:cluster/servers`</td>
    <td>None</td>
    <td>Lists all servers with the specified `cluster`.</td>
  </tr>  
  <tr>
    <td>Roles</td>
    <td>`GET /roles`</td>
    <td>None</td>
    <td>Returns a list of all roles.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`GET /roles/:name`</td>
    <td>None</td>
    <td>Returns the informations about the role with `name`.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`POST /roles/:name`</td>
    <td>JSON</td>
    <td>Creates a new role.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`PUT /roles/:name`</td>
    <td>JSON</td>
    <td>Adds a version to the role with `name`.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`DELETE /roles/:name`</td>
    <td>None</td>
    <td>Deletes the corresponding role with `name`.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`DELETE /roles/:name/:version`</td>
    <td>None</td>
    <td>Removes the `version` for the role with `name`.</td>
  </tr>
  <tr>
    <td>Roles</td>
    <td>`GET /roles/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers for the role with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`GET /groups`</td>
    <td>None</td>
    <td>Returns a list of all groups.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`GET /groups/:name`</td>
    <td>None</td>
    <td>Returns the informations about the group with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`POST /groups/:name`</td>
    <td>JSON</td>
    <td>Creates a new group.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`PUT /groups/:name`</td>
    <td>JSON</td>
    <td>Updates the group with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`DELETE /groups/:name`</td>
    <td>None</td>
    <td>Deletes the corresponding group with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`GET /groups/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers for the role with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`GET /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Lists details for the server with IP `server` in group `group`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`PUT /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Updates the server with `id` in the group with `name`.</td>
  </tr>
  <tr>
    <td>Groups</td>
    <td>`DELETE /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Removes a server from conservatory. **Will not remove the server from your IaaS provider.**</td>
  </tr>
  <tr>
    <td>Providers</td>
    <td>`GET /providers/:provider/groups`</td>
    <td>None</td>
    <td>Lists all groups for the specified provider.</td>
  </tr>  
  <tr>
    <td>Users</td>
    <td>`GET /users/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers created by the user with `name`.</td>
  </tr>
</table>

[meta:title]: <> (Single-page Conservatory API Reference)