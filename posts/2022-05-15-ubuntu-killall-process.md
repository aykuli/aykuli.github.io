---
title: Ubuntu killall process { process_name }
date: 2022-05-15
tags:
  - ubuntu
layout: layouts/post.njk
---

Today my rubymine freezed and didn't wanted to ask my requests to action. I decided to kill processes related to rubymine.

Command to see all processes:

```bash
pgrep -l -u a
```

![img](../../img/posts/2022-05-15-kill_process_1.png)

Then I killed all processes I wanted:

```bash
killall rubymine.sh
killall ruby
```

That is all.
