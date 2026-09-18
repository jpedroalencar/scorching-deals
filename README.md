# Scorching Deals

[scorchingdeals.ca](https://scorchingdeals.ca)

Price tracking and deal aggregation platform designed to capture daily price snapshots, identify discounts against averages, and display historical price trends.

> **Status:** Under active development. This repository is currently in the initial MVP construction phase and is not yet feature-complete or production-ready.

## Architecture Plan

The platform uses a decoupled, polyglot architecture:

- **Data Ingestion (Python):** Headless script that fetches product pricing data, normalize inputs, and records snapshots.
- **Database (PostgreSQL):** Relational data store for integrity and quick querying
- **Core API (Java Spring Boot):** RESTful service exposing normalized Data Transfer Objects
- **Frontend (Next.js, React):** Interface with responsive product cards and time/price history charts.

## Prerequisites

- Docker and Docker Compose
- Java Development Kit (JDK) 21 or later
- Node.js 18 or later
- Python 3.10 or later

## Local Setup (WIP)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/scorching-deals.git
cd scorching-deals
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=scorchingdeals
SERPAPI_KEY=your_api_key
```

### 3. Start Database Infrastructure

```bash
docker compose up -d postgres
```

Detailed component execution instructions will be documented as the services are scaffolded.

## License

This project is licensed under the MIT License.
