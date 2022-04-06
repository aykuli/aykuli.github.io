---
title: Difference between npm install and npm ci
date: 2022-04-05
tags:
  - npm
layout: layouts/post.njk
---

Using `npm install some-lib-name` installs latest version of that library. In `package.json` we can see installed package in `dependencies` or `devDependencies`. There you can see `^` (Caret symbol [[1](#sources)]). This symbol means that if you use `npm install` you get the latest version.

![img](../../img/posts/2022-04-05-package.png)

Exact version of libraries is written in `package-lock.json`. That is why if you use `npm ci` you will get exact version of libraries.

![img](../../img/posts/2022-04-05-package-lock.png)

If `package-lock.json` exists, you can use `npm ci`. This command installs exact version of libraries that is fixed in `package-lock.json` file.

### Conclusion

Another way to install exact version of libraries is use this command:

    npm install [package-name]@[version-number]
    yarn install [package-name]@[version-number]

Installing exact version from `package-lock.json` commands:

    npm ci
    yarn install --frozen-lockfile

### Sources

1. [List of typographical symbols and punctuation marks](https://en.wikipedia.org/wiki/List_of_typographical_symbols_and_punctuation_marks)
