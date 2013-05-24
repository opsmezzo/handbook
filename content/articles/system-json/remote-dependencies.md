Remote dependencies are a way of connecting systems to other systems running on
remote servers.

For example, OpsMezzo backend (`conservatory` and `composer`) needs CouchDB to
operate. Thus, systems installing this software will have `couchdb` system in
their `remoteDependencies`.

## Example

Let's take `system.json` file from `composer` system:

```
{
  "name": "composer",
  "version": "1.0.0",
  "remoteDependencies": {
    "couchdb": "1.0.x"
  }
```
[meta:title]: <> (Remote dependencies)
