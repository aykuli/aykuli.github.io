---
title: Frequently used Linux Commands
date: 2022-03-03
tags:
  - ubuntu
  - linux
layout: layouts/post.njk
---

- `pwd` - current directory

- `ls -al` - list of fileas and directi=ories in folder

- `rm file_or_dir_name` - remove

- `cp file1 file2` - copy content of file1 to file2

- `tail -N` - see last N lines in file

- `head -N` - see first N lines in file

- `less filename` - see content of file

- `cat package.json | grep "@11ty/"` - see lines which contain string `@11ty/`

result:

```
    "@11ty/eleventy": "^1.0.0",
    "@11ty/eleventy-navigation": "^0.3.2",
    "@11ty/eleventy-plugin-rss": "^1.1.2",
    "@11ty/eleventy-plugin-syntaxhighlight": "^3.1.3",
```

- `cat package.json | head -3` - see first 3 lines in file

result:

```
{
  "name": "Aynur Shuaerman's notes",
  "version": "1.0.0",
```

- `find . -name index` - find in current folder files containing string `index`

- `diff posts/2022-03-13-linux-commands/index.md posts/2022-01-30-ubuntu-install-list.md` - difference between this files

`df` - disk space information
