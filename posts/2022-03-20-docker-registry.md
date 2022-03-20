---
title: Docker Registry
date: 2022-03-20
tags:
  - docker
layout: layouts/post.njk
---

Docker registry located here: [https://hub.docker.com/](https://hub.docker.com/)
Commands examples:

```docker
# default tag latest
docker pull node
# loading with exact tag
docker pull node:alpine:3.14


# preloading images mentioned in docker-compose
docker-compose pull
```

Searching in docker registry. No tags in results.

```docker
# searching in docker registry
docker search node
```

<details>
    <summary>Result of searching</summary>
    <pre style="background-color: #daeeea">
NAME                                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
node                                 Node.js is a JavaScript-based platform for s…   11256     [OK]       
mongo-express                        Web-based MongoDB admin interface, written w…   1146      [OK]       
circleci/node                        Node.js is a JavaScript-based platform for s…   126                  
bitnami/node                         Bitnami Node.js Docker Image                    60                   [OK]
cimg/node                            The CircleCI Node.js Docker Convenience Imag…   9                    
wallarm/node                         Wallarm: end-to-end API security solution       5                    [OK]
bitnami/node-exporter                Bitnami Node Exporter Docker Image              3                    [OK]
appdynamics/nodejs-agent             Agent for monitoring Node.js applications       3                    
sysdig/node-image-analyzer           In cluster component that allows scanning im…   2                    
bitnami/node-snapshot                                                                1                    
purestorage/node-config              image for configuring node to install tools …   0                    
docker/node-agent-k8s                                                                0                    
ibmcom/node-exporter                 Docker Image for IBM Cloud Private-CE (Commu…   0                    
ibmcom/node-exporter-ppc64le         Docker Image for IBM Cloud Private-CE (Commu…   0                    
ibmcom/nodejs-mobile-foundation                                                      0                    
vmware/node                          Node.js base built on top of Photon OS          0                    [OK]
rancher/node-simulator                                                               0                    
rancher/node-exporter                                                                0                    
ibmcom/node-problem-detector                                                         0                    
ibmcom/node-exporter-s390x                                                           0                    
ibmcom/node-exporter-amd64                                                           0                    
wallarm/node-k8s-amd64               Kubernetes Ingress Controller with Wallarm e…   0                    
ibmcom/node-for-redis                                                                0                    
wallarm/node-k8s                                                                     0                    
ibmcom/node-problem-detector-amd64                                                   0 
    </pre>
</details>
