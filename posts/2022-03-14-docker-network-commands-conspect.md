---
title: Dockerfile Network Commands Conspect
date: 2022-03-15
tags:
  - docker
layout: layouts/post.njk
---

### Network drivers

`bridge` - isolated network between containers. Works only in one host.

`host` - remove network isolation between the container

`overlay` - Docker swarm

`macvlan` - unique MAC address from container

`null` - container without network

### Commands

```
connect
create
diconnect
inspect
ls
rm
prune
```

#### Examples

```bash
docker network ls
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
<summary>Result</summary>
<pre style="background-color: #DDD">
NETWORK ID     NAME          DRIVER    SCOPE
8177523a8087   ayn-network   bridge    local
19588a186fed   bridge        bridge    local
5450493e59b7   host          host      local
fa699046eb10   none          null      local
</pre>
</details>

```
docker network inspect bridge
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
<summary>Result</summary>
<pre style="background-color: #DDD">
[
    {
        "Name": "bridge",
        "Id": "19588a186fed23412c698e7bd0fc8cc7b97bc8f3b2123784fe6d30845c3784d9",
        "Created": "2022-03-15T15:01:03.274362572Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        <div style="background-color: #FCC">
        "Containers": {
            "480849852ab9df8156166f5e821e6f2a72195abffc9809dd0958167cc71779ff": {
                "Name": "node1",
                "EndpointID": "7e76de9eda40652eea458cbbbde534b413de5da354b96e3d2d8199eccea31e4c",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "88f61bcb695ca7647916b07f5dc6bbaaec51e0181e11cada99cdf8c0912bcbb5": {
                "Name": "stupefied_chatterjee",
                "EndpointID": "8b71507e712adda9d535187e82b488df3d9731bab87cd61a56365752434e70a0",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            },
            "abde5f3677d0b97987ab265c5de6b35b3be2db79a0cd10c612f98b30c8971641": {
                "Name": "node2",
                "EndpointID": "6a5cae843b651c20b8cfe83b6d6c8b78b830d85c14e114502496a05960e68e74",
                "MacAddress": "02:42:ac:11:00:04",
                "IPv4Address": "172.17.0.4/16",
                "IPv6Address": ""
            },
            "ed6a0c472ad8c00b33cfec7de1775fd8c7bfaec1fdfa3241aab5f155397d01b2": {
                "Name": "node3",
                "EndpointID": "31e2b0ac774eda44afbc82f772dbcb6cbbd6ac12742f79271898f9c6ac7dc5bf",
                "MacAddress": "02:42:ac:11:00:05",
                "IPv4Address": "172.17.0.5/16",
                "IPv6Address": ""
            }
        },
        </div>
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
</pre>
</details>

```
docker create ayn-network
docker network ls
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
<summary>Result</summary>
<pre style="background-color: #DDD">
NETWORK ID     NAME          DRIVER    SCOPE
8177523a8087   ayn-network   bridge    local
19588a186fed   bridge        bridge    local
5450493e59b7   host          host      local
fa699046eb10   none          null      local
</pre>
</details>

```
docker connect ayn-network node1
docker connect ayn-network node2
docker network inspect
```

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
<summary>Result</summary>
<pre style="background-color: #DDD">
[
    {
        "Name": "ayn-network",
        "Id": "8177523a808757893a0f240da2c3ab78f77ea16d166f41687627c893eb4f10ce",
        "Created": "2022-03-15T15:54:47.29301923Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        <div style="background-color: #FCC">
        "Containers": {
            "480849852ab9df8156166f5e821e6f2a72195abffc9809dd0958167cc71779ff": {
                "Name": "node1",
                "EndpointID": "e0750851f2ed267ae5bf8ad20c236d6165e7f58ed85f7b58b2518b66bc2e5fd5",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "abde5f3677d0b97987ab265c5de6b35b3be2db79a0cd10c612f98b30c8971641": {
                "Name": "node2",
                "EndpointID": "dae5e0b3b0995f830a4f837e3431b929ba9c267eb604be2bd05ea238285d9396",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        </div>
        "Options": {},
        "Labels": {}
    }
]
</pre>
</details>

```
docker run --name=node3 --network ayn-network -p 3001:3000 -d demo:latest
curl localhost:3001
```

This container exits in `ayn-network` only and doesn't exist in `bridge`. Port 3001 on host shows port 3000 of container with name node3

<details style="padding-bottom:10px;margin-bottom: 40px;border-bottom: 1px solid #DDD">
<summary>Result</summary>
<pre style="background-color: #DDD">
{"eth0":["172.18.0.5"]}
</pre>
</details>
