Remote dependencies are a way of connecting systems to other systems running on remote servers. When a [system.json](/system-json) package has [remoteDependencies](/system-json/remote-dependencies), the information about servers which satisfy them is available for both `/scripts` and `/templates`.

For example, OpsMezzo backends, `conservatory` and `composer`, need CouchDB to operate. Thus, systems installing this software will have `couchdb` system in their `remoteDependencies`.

<hr>

## Example

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

### 2. Remote dependencies will be satisfied when provisioning 

When a server with this `system.json` is provisioned using [baton](/baton) or `conservatory`, we will ensure that all of the `remoteDependencies` exist on servers that are running. **If the `remoteDependencies` are not satisfied initially then [baton](/baton) or `conservatory` will provision them _before provisioning the composer server._**

In our `composer` example, that means that **if a server running `couchdb` does not exist then one will be created _before provisioning the composer server._**

```
  baton servers create --role composer --prepare
```

[meta:title]: <> (Remote dependencies)
