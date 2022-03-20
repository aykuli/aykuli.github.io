---
title: Docker Compose Sharing Configuration
date: 2022-03-20
tags:
  - docker
layout: layouts/post.njk
---

For example, I have two docker-compose files.

<details>
    <summary>docker-compose.yml</summary>
    <pre style="background-color: #daeeea">
version: '3'
services:
  converter:
    build:
      context: .
      dockerfile: ./apps/converter/Dockerfile
    restart: always
    container_name: converter
    volumes:
      - ./.env:/opt/app/.env
    networks:
      - an1
    depends_on:
      - rmq
  api:<div style="background-color: #FEE">
    extends:
      file: docker-compose.api.yml
      service: api
      </div>
    depends_on:
      - rmq
  app:
    build:
      context: .
      dockerfile: ./apps/app/Dockerfile
    restart: always
    container_name: app
    ports:
      - 3001:80
    networks:
      - an1
  rmq:
    image: rabbitmq:latest
    restart: always
    networks:
      - an1
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=admin
networks:
  an1:
    driver: bridge
</pre>

</details>

<details>
    <summary>docker-compose.api.yml</summary>
    <pre style="background-color: #daeeea">
version: '3'
services:
  api:
    build:
      context: .
      dockerfile: ./apps/api/Dockerfile
    restart: always
    container_name: api
    volumes:
    - .env:/opt/app/.env
    ports:
    - 3002:3000
    networks:
    - an1
</details>

```
extends:
  file: docker-compose.api.yml
  service: api
```

I write in main docker-compose file to the service i want to be extended `extends` field and wrote:

Command to see the resulting docker-compose file:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml config
```

<details>
    <summary>Result</summary>
    <pre style="background-color: #daeeea">
networks:
  an1:
    driver: bridge
services:
  api:
    build:
      context: /home/ay/_git/docker-demo
      dockerfile: ./apps/api/Dockerfile
    container_name: api
    depends_on:
      rmq:
        condition: service_started
    networks:
      an1: {}
    ports:
    - published: 3002
      target: 3000
    restart: always
    volumes:
    - /home/ay/_git/docker-demo/.env:/opt/app/.env:rw
  app:
    build:
      context: /home/ay/_git/docker-demo
      dockerfile: ./apps/app/Dockerfile
    container_name: app
    networks:
      an1: {}
    ports:
    - published: 3001
      target: 80
    restart: always
  converter:
    build:
      context: /home/ay/_git/docker-demo
      dockerfile: ./apps/converter/Dockerfile
    container_name: converter
    depends_on:
      rmq:
        condition: service_started
    networks:
      an1: {}
    restart: always
    volumes:
    - /home/ay/_git/docker-demo/.env:/opt/app/.env:rw
  rmq:
    environment:
      RABBITMQ_DEFAULT_PASS: admin
      RABBITMQ_DEFAULT_USER: admin
    image: rabbitmq:latest
    networks:
      an1: {}
    ports:
    - published: 15672
      target: 15672
    restart: always
version: '3'
    </pre>

</details>
