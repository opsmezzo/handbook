
```
  $ ./conservatory/bin/provisioner 


          ___  ____ _   _  ___  ___  ___ _  __ ____ ____ ____  ___ _  __
         /    /   / /\  / /__  /_   /__/ |  / /___/  /  /   / /__/ /__/
        /___ /___/ /  \/ ___/ /__  /  \  |_/ /   /  /  /___/ /  \  /

        © 2010 Nodejitsu Inc.
        All Rights Reserved - www.nodejitsu.com


  conservatory has started successfully as provisioner @ 127.0.0.1 on port 9003...
```

Conservatory exposes a RESTful backend for managing `Servers`, `Roles`, and `Groups`, This is the backend for  [`baton`](/baton).

<hr/>
### Learn more
* System management with [Composer](/conservatory/composer)
* Server management with [Provisioner](/conservatory/provisioner)

<a name="servers"></a>
## Servers

```
/servers
```

**GET** Lists all servers in the cluster

<hr/>

```
/servers/:server-name
```

**POST** Creates a new server

**GET** Shows the details of `server-name`

**PUT** Updates `server-name` with valid settings

**DELETE** Deletes `server-name`

<hr/>

<a name="roles"></a>
## Roles

```
/roles
```

**GET** Lists all roles

<hr/>

```
/roles/:role
```

**GET** Shows details of the `role`

**POST** Creates a new `role`

**PUT** Updates `role` with valid properties

**DELETE** Deletes the specified `role`

<hr/>

```
/roles/:role/:server
```

**GET** Lists all servers for the specified `role`

<hr/>

<a name="providers"></a>
## Providers

```
/providers/:provider/groups/
```

**GET** Lists all groups for the specified provider

<hr/>

<a name="groups"></a>
## Groups

```
/groups
```

**GET** Lists all groups

<hr/>

```
/groups/:group
```

**GET** Shows details for `group`

**POST** Creates new `group`

**PUT** Updates `group` with valid properties

**DELETE** Deletes `group`

<hr/>

```
/groups/:group/servers
```

**GET** Lists all servers for the specified `group`

<hr/>

```
/groups/:group/servers/:server
```

**GET** Lists details for the server with IP `server` in group `group`

**PUT** Updates the specified server 

**DELETE** Removes the `server` in `group`

[meta:title]: <> (Conservatory API Reference)