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
- Full-text search using `match`
- Filter by exact values and numeric ranges
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
docker run -d --name elasticsearch-service -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:8.19.10
```

## Run MySQL (Docker)

```bash
docker run --name mysql-service -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```

```bash
npm install
```

```bash
npm run start:dev
```
