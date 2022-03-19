---
title: Dockerfile Network Commands Conspect
date: 2022-03-16
tags:
  - docker
layout: layouts/post.njk
---

---

title: Dockerfile Network Commands Conspect
date: 2022-03-15
tags:

- docker
  layout: layouts/post.njk

---

Command to see what namespace is used by current machine

```
cat /etc/resolve.conf
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
    <summary>Result</summary>
    <pre style="background-color: #DDD">
    # This file is managed by man:systemd-resolved(8). Do not edit.
    #
    # This is a dynamic resolv.conf file for connecting local clients to the
    # internal DNS stub resolver of systemd-resolved. This file lists all
    # configured search domains.
    #
    # Run "resolvectl status" to see details about the uplink DNS servers
    # currently in use.
    #
    # Third party programs must not access this file directly, but only through the
    # symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a different way,
    # replace this symlink by a static file or a different symlink.
    #
    # See man:systemd-resolved.service(8) for details about the supported modes of
    # operation for /etc/resolv.conf.
    nameserver 127.0.0.53
    options edns0 trust-ad
    </pre>

</details>

Adding dns of Google for new container

```
docker run --name node8 -d --dns 8.8.8.8 demo-3
docker exec -it node8 sh
/opt/app# cat /etc/resolv.conf
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
    <summary>Result</summary>
    <pre style="background-color: #DDD">
    nameserver 8.8.8.8
    </pre>
</details>
