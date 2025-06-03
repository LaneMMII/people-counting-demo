# People Counting Demo

## Requirements

- **Node.js**: v22 or higher
- **pnpm**: v10 or higher
- **PostgreSQL**: Ensure you have access to a running PostgreSQL instance
- **Ionic CLI**: v7 or higher

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

## Running the Client Application

Start the client application locally with:

```sh
pnpm dev:people-counting-client
```

This will launch the frontend "people-counting" application that will connect to the people-counting-api. The client app should automatically open in your default browser on port 8100.

## Debugging

You can also run the APIs in debug mode using the provided VS Code launch configurations.

1. Open the "Run and Debug" view in VS Code (usually found in the sidebar, or by pressing `Cmd+Shift+D` or `Ctrl+Shift+D`).
2. In the dropdown menu at the top, select one of the following configurations:
   - **"Launch People Counting API"**: Starts only the People Counting API in debug mode.
   - **"Launch Sensor API"**: Starts only the Sensor API in debug mode.
   - **"Launch Both APIs"**: Starts both APIs in debug mode (recommended).
3. Click the green "Start Debugging" play button (or press `F5`).

This will start the selected API(s) with the debugger attached, allowing you to set breakpoints, inspect variables, and step through the code.

---
