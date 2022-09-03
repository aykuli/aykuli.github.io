---
title: Apt error `Malformed entry`
date: 2022-09-03
tags:
  - linux
layout: layouts/post.njk
---

Error text, when I try to use `apt`:

```bash
apt list --installed
E: Malformed entry 1 in list file /etc/apt/sources.list.d/docker.list ([option] not assignment)
E: The list of sources could not be read.

```

Helped this:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  focal stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
```

Answer [from stackoverflow](https://stackoverflow.com/questions/66374226/e-malformed-entry-1-in-list-file-etc-apt-sources-list-d-docker-list-component).
