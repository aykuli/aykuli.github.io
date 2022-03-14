---
title: Dockerfile Commands Кésumé
date: 2022-01-31
tags:
  - docker
layout: layouts/post.njk
---

Every line will be layer. The less lines in Dockerfile is better.

`Context` - folder containing Dockerfile

`.dockerignore` - ignoring folders/files

---

```docker
ARG CODE_VERSION=latest

FROM node:14-alpine as build

LABEL version="1.0"

USER root
WORKDIR /opt/app

ADD *.json ./
ADD --chown=root files* /somedir/
ADD archive.tar.gz /somedir/
ADD http://link.com/some.tar.gz /somedir/
COPY *.json ./

```

`ARG` - arguments that used only while building, but it doesn't exist in result image
`FROM` - every Dockerfile shpuld have it
`LABEL` - some meta information
`WORKDIR` - working directory
`ADD` - copy from host machine (first argument) into container folder(second argument). Can work with archives, urls, make permissions for exact user, `COPY` can't do that.
`COPY` - allows to copy from local machine and from previos images while multistage building

---

```docker
# comment line
SHELL ["/bin/sh", "-c]
RUN acho hello

ENV FOO = 1
ENV BAR=$FOO
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y

ENTRYPOINT ["top", "-c"]
CMD ["node","./dist/apps/api/main.js"]
CMD node ./dist/apps/api/main.js
EXPOSE 80/tcp
```

`SHELL` - allows to select what shell will be used inside container. `/bin/sh` - default shell
`RUN` - runs shell commands
`ENV` - environment variables that will be saved inside container
`EXPOSE` - documeantaion for developer about used ports
`ENTRYPOINT` - command gets executed when running a container
`CMD` - does the same as `ENTRYPOINT`, difference is

- Dockerfile should specify at least one of `CMD` or `ENTRYPOINT` commands.

- `ENTRYPOINT` has more precedence than `CMD`

- `ENTRYPOINT` should be defined when using the container as an executable.

- `CMD` should be used as a way of defining default arguments for an `ENTRYPOINT` command or for executing an ad-hoc command in a container.

- `CMD` will be overridden when running the container with alternative arguments.[^1]

|                            | No ENTRYPOINT                    | ENTRYPOINT exec_entry p1_entry | ENTRYPOINT [“exec_entry”, “p1_entry”]          |
| -------------------------- | -------------------------------- | ------------------------------ | ---------------------------------------------- |
| No CMD                     | error, not allowed               | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry                            |
| CMD [“exec_cmd”, “p1_cmd”] | exec_cmd p1_cmd                  | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry exec_cmd p1_cmd            |
| CMD [“p1_cmd”, “p2_cmd”]   | p1_cmd p2_cmd                    | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry p1_cmd p2_cmd              |
| CMD exec_cmd p1            | \_cmd /bin/sh -c exec_cmd p1_cmd | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry /bin/sh -c exec_cmd p1_cmd |

[^1]: [Understand how CMD and ENTRYPOINT interact](https://docs.docker.com/engine/reference/builder/#entrypoint)
