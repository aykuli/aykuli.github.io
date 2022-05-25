---
title: Login through ssh without entering password
date: 2022-05-25
tags:
  - ubuntu
layout: layouts/post.njk
---

### 1. Generate public and private keys using ssh-key-gen on localhost:

```bash
ssh-keygen

> Generating public/private rsa key pair.
> Enter file in which to save the key (/home/{your_user}/.ssh/id_rsa):[Enter key]
> Enter passphrase (empty for no passphrase): [Press enter key]
> Enter same passphrase again: [Pess enter key]
> Your identification has been saved in /home/{your_user}/.ssh/id_rsa.
> Your public key has been saved in /home/{your_user}/.ssh/id_rsa.pub.
> The key fingerprint is:
33:b3:fe:af:95:95:18:11:31:d5:de:96:2f:f2:35:f9 {your_user}@localhost

```

### 2. Copy just created public key to remote servert using `ssh-copy-id`:

```bash
ssh-copy-id -i ~/.ssh/{filename_you_entered_before}.pub root@XXX.XXX.XXX.XXX
```

Then you will be invited to enter your password.
After you will get this messages:

```bash
> /usr/bin/ssh-copy-id: INFO: Source of key(s) to > be installed: "/home/{your_user}/.ssh/{filename_you_entered_before}.pub"
> /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
>/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
root@XXX.XXX.XXX.XXX's password:

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'root@185.26.120.39'"
and check to make sure that only the key(s) you wanted were added.

```

### 3. Login to your server without entering the password:

```bash
ssh root@XXX.XXX.XXX.XXX
```
