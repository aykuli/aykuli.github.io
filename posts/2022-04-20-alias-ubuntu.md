---
title: Aliases in Ubuntu
date: 2022-04-20
tags:
  - ubuntu
  - git
  - terminal commands
layout: layouts/post.njk
---

First check if alias name is not used

```bash
type test
```

The result should be one of these:

![img](../../img/posts/2022-04-20-alias-test.png)

As you see, `test0` is not booked, I can use it for my new alias.

```bash
alias test0='cd /usr/;ls;cd -'
```

Result:

![img](../../img/posts/2022-04-20-alias-test-1.png)
