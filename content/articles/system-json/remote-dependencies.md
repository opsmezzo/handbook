Remote dependencies are a way of connecting systems to other systems running on remote servers. When a [system.json](/system-json) package has [remoteDependencies](/system-json/remote-dependencies), the information about servers which satisfy them is available for both `/scripts` and `/templates`.

For example, OpsMezzo backends, `conservatory` and `composer`, need CouchDB to operate. Thus, systems installing this software will have `couchdb` system in their `remoteDependencies`.

<hr>
  
* [Simple example](#simple-example)
* [Configuring with remoteDependencies](#configuring-with-remotedependencies)
* [Provisioning with remoteDependencies](#provisioning-with-remotedependencies)
* [Using clusters with remoteDependencies](#using-clusters)

<hr>

## Simple Example

Let's take a look at the `system.json` manifest for the `composer` system:

``` js
{
  "name": "composer",
  "keywords": ["configuration management", "devops"],
  "author": "Nodejitsu Inc <info@nodejitsu.com>",
  "version": "1.0.0",
  "remoteDependencies": {
    "couchdb": "1.0.x"
  },
  "dependencies": {
    "npm-manager": "1.0.x"
  }
}
```

By adding `couchdb` to the `system.json` manifest will enable two features for this system:

<a name="configuring-with-remotedependencies"></a>
### 1. Configuration for remoteDependencies is available in `/scripts` and `/templates`

When this system is configured (e.g. using `quill configure composer`), the configuration for systems which satisfy the `remoteDependencies` will be available. The `composer` system takes advantage of this in it's templates:

**/templates/composer.json**
``` js
{
  "database": {
    "protocol": "http",
    "host": "{{ servers.couchdb[0].public[0] }}",
    "database": "composer",
    "port": 5984,
    "auth": {
      "username": "couchdb-user",
      "password": "couchdb-password"
    }
  }
}
```

As you can see this example illustrates **a few important conventions.**

* **All configuration for `remoteDependencies` is available under `servers.[dependency-name]`**
* **All `remoteDependencies` are always Array.**
* **The information available for remoteDependencies is:**
```
  {
    "public":  ['list', 'of', 'public',  'ip-addresses'],
    "private": ['list', 'of', 'private', 'ip-addresses']
  }
```

<a name="provisioning-with-remotedependencies"></a>
### 2. Remote dependencies will be satisfied when provisioning 

When a server with this `system.json` is provisioned using [baton](/baton) or `conservatory`, we will ensure that all of the `remoteDependencies` exist on servers that are running. **If the `remoteDependencies` are not satisfied initially then [baton](/baton) or `conservatory` will provision them _before provisioning the composer server._**

In our `composer` example, that means that **if a server running `couchdb` does not exist then one will be created _before provisioning the composer server._**

```
  baton servers create --role composer --prepare
```

<a name="provisioning-with-remotedependencies"></a>
### 3. Remote dependencies can be satisfied from unique clusters

By default: the list of servers used to satisfy a remoteDependencies for a given server is _all servers running that dependency in the same group._ **Clusters are a more granular way to organize your servers.** For example consider:

* There are two CouchDB servers in the same group: one for _production_ and one for _staging_
* You wish to provision a `composer` server in that group which only uses the _staging_ CouchDB server.

By default you would not be able to determine which server would appear first in the list of servers so

**config.json**
``` js
  {
    "couchdb": "{{ servers.couchdb.0.public.0 }}"
  }
```

could be pointing to the wrong server. **Clusters allow you solve this problem elegantly.** Assuming that the _production_ CouchDB server has been placed in the `production` cluster and the _staging_ CouchDB server has been placed in the `staging` cluster you can tell `baton` and `quill` to use only one (or more) cluster:

#### Clusters in `baton`

```
  baton servers create --role composer --cluster production --config production --prepare
```

#### Clusters in `quill`

```
  baton configure composer --cluster production --config production
```

If there is no CouchDB in `production` cluster, `baton` will create one for you (just like it would create a remote dependency).

[meta:title]: <> (Remote dependencies)
