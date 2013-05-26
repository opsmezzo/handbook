SSH keys management can be done with `baton` using the following commands:

<hr>

### Add SSH public keys

```
baton addkey
baton addkey <public-key>
baton addkey <public-key> <name>
```

```
baton keys add
baton keys add <public-key>
baton keys add <public-key> <name>
```

Uploads your default public SSH key to the provisioner

Defaults: 

* **<public-key>** `~/.ssh/id_rsa.pub`
* **<name>** `publicKey`

<hr>

### Sync keys with Infrastructure providers

```
baton synckeys
baton synckeys <username>
baton synckeys --group <group>
```

```
baton keys sync
baton keys sync <username>
baton keys sync --group <group>
```

Syncs the keys a given `username` with a given group (i.e. IaaS provider). If no username is provided then all SSH public keys are synced with the specified group.

If no group is specified, then you will be prompted for one.

[meta:title]: <> (Managing SSH keys)