# NestJS Elasticsearch Search API

A simple backend service built with **NestJS** and **Elasticsearch** that demonstrates
how to index data and perform fast full-text search with filters.

This project is designed as a **portfolio project**

---

## Tech Stack

- Node.js
- TypeScript(NestJS)
- Elasticsearch (Docker)
- MySQL (Docker)
- @elastic/elasticsearch

---

## Features

- Bootstrap Elasticsearch index on application startup
- Create product and index it into Elasticsearch
- Full-text search using `match` (WIP)
- Filter by exact values and numeric ranges (WIP)
- Pagination and sorting (WIP)

---

## Architecture Overview

Client
↓
NestJS API
↓
Elasticsearch (Search Engine)

## Getting Started

## Run Elasticsearch (Docker)

```bash
docker run -d \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  docker.elastic.co/elasticsearch/elasticsearch:8.11.3
```

## Run MySQL (Docker)

```bash

```

```bash
npm install
```

```bash
npm run start:dev
```
