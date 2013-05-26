
```
  $ ./conservatory/bin/provisioner 


          ___  ____ _   _  ___  ___  ___ _  __ ____ ____ ____  ___ _  __
         /    /   / /\  / /__  /_   /__/ |  / /___/  /  /   / /__/ /__/
        /___ /___/ /  \/ ___/ /__  /  \  |_/ /   /  /  /___/ /  \  /

        © 2010 Nodejitsu Inc.
        All Rights Reserved - www.nodejitsu.com


  conservatory has started successfully as provisioner @ 127.0.0.1 on port 9003...
```

Conservatory exposes a RESTful backend for managing `Servers`, `Roles`, and `Groups`. This is the backend for  [`baton`](/baton).

* [Resource Ids](#resource-ids)
* **REST Resources**
  * [Servers](#servers)
  * [Clusters](#clusters)
  * [Roles](#roles)
  * [Groups](#groups)
  * [Providers](#providers)
  * [Users](#users)

<hr/>

## Resource Ids
<table>
  <thead>
    <tr>
      <th>Resource</th>
      <th>Id</th>
    </tr>
  </thead>
  <tr>
    <td>Cluster name</td>
    <td>`/([\w_-\.]+)/`</td>
  </tr>
  <tr>
    <td>Group name</td>
    <td>`/([\w_-\.]+)/`</td>
  </tr>
  <tr>
    <td>Provider name</td>
    <td>`/([\w_-\.]+)/`</td>
  </tr>
  <tr>
    <td>Role name</td>
    <td>`/([\w_-\.]+)/`</td>
  </tr>
  <tr>
    <td>Role version</td>
    <td>Valid [Semver](http://semver.org)</td>
  </tr>
  <tr>
    <td>Server id</td>
    <td>`/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/`</td>
  </tr>
  <tr>
    <td>Username</td>
    <td>`/([\w_-\.]+)/`</td>
  </tr>
</table>

<hr/>

<a name="servers"></a>
## Servers

<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /servers`</td>
    <td>None</td>
    <td>Returns a list of all servers.</td>
  </tr>
  <tr>
    <td>`GET /servers/:id`</td>
    <td>None</td>
    <td>Returns the informations about the server with `id`.</td>
  </tr>
  <tr>
    <td>`POST /servers/:id`</td>
    <td>JSON</td>
    <td>Adds an existing server to conservatory. **Will not provision from your IaaS provider.**</td>
  </tr>
  <tr>
    <td>`PUT /servers/:id`</td>
    <td>JSON</td>
    <td>Updates the server with the specified `id`.</td>
  </tr>
  <tr>
    <td>`DELETE /servers/:id`</td>
    <td>None</td>
    <td>Removes a server from conservatory. **Will not remove the server from your IaaS provider.**</td>
  </tr>
  <tr>
    <td>`POST /servers/tagged`</td>
    <td>JSON</td>
    <td>Returns a list of all servers with the specified `body.tags`.</td>
  </tr>
  <tr>
    <td>`POST /servers/uid`</td>
    <td>JSON</td>
    <td>Returns the unique identifier for the server information.</td>
  </tr>
</table>

<hr/>

<a name="clusters"></a>
## Clusters

<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /clusters/:cluster/servers`</td>
    <td>None</td>
    <td>Lists all servers with the specified `cluster`.</td>
  </tr>  
</table>

<hr/>

<a name="roles"></a>
## Roles

<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /roles`</td>
    <td>None</td>
    <td>Returns a list of all roles.</td>
  </tr>
  <tr>
    <td>`GET /roles/:name`</td>
    <td>None</td>
    <td>Returns the informations about the role with `name`.</td>
  </tr>
  <tr>
    <td>`POST /roles/:name`</td>
    <td>JSON</td>
    <td>Creates a new role.</td>
  </tr>
  <tr>
    <td>`PUT /roles/:name`</td>
    <td>JSON</td>
    <td>Adds a version to the role with `name`.</td>
  </tr>
  <tr>
    <td>`DELETE /roles/:name`</td>
    <td>None</td>
    <td>Deletes the corresponding role with `name`.</td>
  </tr>
  <tr>
    <td>`DELETE /roles/:name/:version`</td>
    <td>None</td>
    <td>Removes the `version` for the role with `name`.</td>
  </tr>
  <tr>
    <td>`GET /roles/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers for the role with `name`.</td>
  </tr>  
</table>

<hr/>

<a name="groups"></a>
## Groups

### Basic Operations
<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /groups`</td>
    <td>None</td>
    <td>Returns a list of all groups.</td>
  </tr>
  <tr>
    <td>`GET /groups/:name`</td>
    <td>None</td>
    <td>Returns the informations about the group with `name`.</td>
  </tr>
  <tr>
    <td>`POST /groups/:name`</td>
    <td>JSON</td>
    <td>Creates a new group.</td>
  </tr>
  <tr>
    <td>`PUT /groups/:name`</td>
    <td>JSON</td>
    <td>Updates the group with `name`.</td>
  </tr>
  <tr>
    <td>`DELETE /groups/:name`</td>
    <td>None</td>
    <td>Deletes the corresponding group with `name`.</td>
  </tr>
</table>

<hr/>

### Servers in Group
<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /groups/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers for the role with `name`.</td>
  </tr>
  <tr>
    <td>`GET /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Lists details for the server with IP `server` in group `group`.</td>
  </tr>
  <tr>
    <td>`PUT /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Updates the server with `id` in the group with `name`.</td>
  </tr>
  <tr>
    <td>`DELETE /groups/:name/servers/:id`</td>
    <td>None</td>
    <td>Removes a server from conservatory. **Will not remove the server from your IaaS provider.**</td>
  </tr>
</table>

<hr/>

<a name="providers"></a>
## Providers

<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /providers/:provider/groups`</td>
    <td>None</td>
    <td>Lists all groups for the specified provider.</td>
  </tr>  
</table>

<hr/>

## Users

<table>
  <thead>
    <th>Route</th>
    <th>Body</th>
    <th>Description</th>
  </thead>
  <tr>
    <td>`GET /users/:name/servers`</td>
    <td>None</td>
    <td>Lists all servers created by the user with `name`.</td>
  </tr>
</table>

[meta:title]: <> (Conservatory API Reference)