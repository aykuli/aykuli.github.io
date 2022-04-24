---
title: Gitignore global
date: 2022-04-23
tags:
  - git
layout: layouts/post.njk
---

1. Check if a git already has a global gitignore

```bash
git config --get core.excludesfile
```

2. If there is no answer (empty), create file wherever you want to.
   For example, I have it here `~/.config/git/.gitignore`

3. Tell git where the file is

```bash
git config --global core.excludesfile '~/.config/git/.gitignore'
```

4. Now check:

![global-git-ignore](../../img/posts/2022-04-24-global-git-ignore.png)

5. Also in `.gitconfig` file shoud exist such lines:

![global-git-ignore-0](../../img/posts/2022-04-24-global-git-ignore_1.png)

### Source:

- [stackoverflow](<[../../img/posts/2022-04-20-alias-test-1.png](https://stackoverflow.com/questions/7335420/global-git-ignore)>)
