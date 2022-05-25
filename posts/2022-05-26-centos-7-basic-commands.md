---
title: CentOS 7 basic commands I use recently
date: 2022-05-26
tags:
  - ubuntu
layout: layouts/post.njk
---

<details>
  <summary>
  Check version
  </summary>

```bash
user$ rpm -q centos-release
> centos-release-7-9.2009.1.el7.centos.x86_64

```

Another way:

```bash
user$ cat /etc/*elease
CentOS Linux release 7.9.2009 (Core)
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"

CentOS Linux release 7.9.2009 (Core)
CentOS Linux release 7.9.2009 (Core)
```

</details>
