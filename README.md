# People Counting Demo

## Requirements

- **Node.js**: v22 or higher
- **pnpm**: v10 or higher
- **PostgreSQL**: Ensure you have access to a running PostgreSQL instance

## Setup

1. **Create Databases**

Run the following commands in your PostgreSQL client:

```sql
CREATE DATABASE sensor_db;
CREATE DATABASE people_counting;
```

2. **Run Migrations and Seeds**

Apply the migration and seed files located in `/sensor-system/migrations/`:

- `v0.1.sql` (migration)
- Seed file (also in the same directory)

> **Note:** Run these scripts on the appropriate databases before starting the APIs.

3. **Install Dependencies**

```sh
pnpm install
```

## Running the APIs

- **Sensor API:**  
  Start locally with:

  ```sh
  pnpm dev:sensor-api
  ```

- **People Counting API:**  
  Start locally with:

  ```sh
  pnpm dev:people-counting-api
  ```

- **Run Both in Tandem (Recommended):**  
  Start locally with:
  ```sh
  pnpm dev:all
  ```

---
