# People Counting Demo

![people-counting-demo](https://github.com/user-attachments/assets/c068fee3-d9f6-472b-8da8-eac4d0a26597)

## Description

This repository is a pnpm workspace monorepo containing two systems:

1. Sensor System
   Simulates third-party people-counting sensors that send count packets every minute to a specified ingest endpoint. Each sensor has a single count line and minimal configuration comprising of a hours of operation schedule, firmware version, mount height, and data push endpoint.

2. People Counting System
   Represents an integrator application that captures data from sensors and presents it to end users. For simplicity, sensors are not linked to devices via a foreign key. Instead, a shared static identity (Sensor.id and Device.id) is used during seeding, as the sensor list does not change. Within the people counting system the user can create, edit, delete both devices and locations. As well as the user can view count data by device or location. The API allows for pulling count data between a date range and aggregating by minute, hour, day, or week. The data will be displayed on a line chart with "in" counts on one line and "out" counts on a separate line.

## Requirements

- **Node.js**: v22 or higher
- **pnpm**: v10 or higher
- **PostgreSQL**: v14 or higher
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
