---
title: "Enterprise Multi-Region Datacenter Network Migration & EVPN-VXLAN Fabric"
publishedAt: "2026-02-10"
description: "Architected and migrated an on-premise infrastructure across 3 physical datacenters to an EVPN-VXLAN spine-leaf fabric with zero operational downtime."
tags: ["networking", "datacenter", "evpn-vxlan", "cisco", "automation"]
architecture: "Spine-Leaf EVPN-VXLAN with Anycast Gateway"
metrics:
  - label: "Throughput Capacity"
    value: "3.2 Tbps"
  - label: "Failover Time"
    value: "< 250ms"
  - label: "Downtime"
    value: "0 min"
liveUrl: "https://github.com/bendeze"
githubUrl: "https://github.com/bendeze"
ogImage: "/placeholder_image.png"
---

This project involved designing and migrating a mission-critical multi-tenant datacenter network from legacy STP (Spanning Tree Protocol) to a modern, scalable **EVPN-VXLAN Spine-Leaf architecture** using BGP as the control plane.

## High-Level Architecture Overview

```mermaid
flowchart TD
    subgraph DCI ["Datacenter Interconnect (DCI)"]
        DC1["Datacenter East (Spine 1 & 2)"]
        DC2["Datacenter West (Spine 3 & 4)"]
    end
    
    subgraph Fabric ["EVPN-VXLAN Underlay & Overlay"]
        LeafA["Leaf Pair 01 (VTEP A)"]
        LeafB["Leaf Pair 02 (VTEP B)"]
        LeafC["Leaf Pair 03 (VTEP C)"]
    end
    
    subgraph Tenants ["Multi-Tenant VRFs"]
        VRF_PROD["VRF Production (VNI 10001)"]
        VRF_DMZ["VRF DMZ (VNI 10002)"]
    end

    DC1 <--> DC2
    DC1 --> LeafA
    DC1 --> LeafB
    DC2 --> LeafB
    DC2 --> LeafC
    
    LeafA --> VRF_PROD
    LeafB --> VRF_DMZ
    LeafC --> VRF_PROD
```

### Key Technical Achievements

1. **Elimination of STP Blocking**: Full bisectional bandwidth utilization across all links using Equal-Cost Multi-Path (ECMP) routing.
2. **Layer 2 Extension over Layer 3**: Seamless VM mobility across physical racks without re-IPing.
3. **Automated Provisioning**: Infrastructure-as-Code via Ansible to deploy consistent switch configurations across all leaf pairs.
