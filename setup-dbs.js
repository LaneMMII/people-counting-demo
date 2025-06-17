const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

require('dotenv').config();

const PG_USER = process.env.DB_USER || 'postgres';
const PG_PASSWORD = process.env.DB_PASSWORD || 'pass';
const PG_HOST = process.env.DB_HOST || 'localhost';
const PG_PORT = process.env.DB_PORT || '5432';

// Use the same env vars as the API configs
const SENSOR_DB_NAME = process.env.SENSOR_DB_NAME || 'sensor_db';
const PEOPLE_COUNTING_DB_NAME =
  process.env.PEOPLE_COUNTING_DB_NAME || 'people_counting';

// Cross-platform command runner with env support
async function runCommand(command, env = {}) {
  try {
    const { stdout, stderr } = await execAsync(command, {
      env: { ...process.env, ...env },
    });
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    throw error;
  }
}

async function setupDatabases() {
  // Drop and recreate databases
  const dropCommands = [
    {
      cmd: `psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "DROP DATABASE IF EXISTS ${SENSOR_DB_NAME};"`,
      env: { PGPASSWORD: PG_PASSWORD },
    },
    {
      cmd: `psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "DROP DATABASE IF EXISTS ${PEOPLE_COUNTING_DB_NAME};"`,
      env: { PGPASSWORD: PG_PASSWORD },
    },
  ];

  const createCommands = [
    {
      cmd: `psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "CREATE DATABASE ${SENSOR_DB_NAME};"`,
      env: { PGPASSWORD: PG_PASSWORD },
    },
    {
      cmd: `psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "CREATE DATABASE ${PEOPLE_COUNTING_DB_NAME};"`,
      env: { PGPASSWORD: PG_PASSWORD },
    },
  ];

  // Run migrations and seeds
  const migrationCommands = [
    { cmd: 'cd sensor-system/sensor-api && pnpm migrate && pnpm seed' },
    {
      cmd: 'cd people-counting-system/people-counting-api && pnpm migrate && pnpm seed',
    },
    {
      cmd: `psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -d ${PEOPLE_COUNTING_DB_NAME} -f people-counting-system/migrations/backfill-counts.sql`,
      env: { PGPASSWORD: PG_PASSWORD },
    },
  ];

  try {
    console.log('Dropping existing databases...');
    for (const { cmd, env } of dropCommands) {
      await runCommand(cmd, env);
    }

    console.log('Creating fresh databases...');
    for (const { cmd, env } of createCommands) {
      await runCommand(cmd, env);
    }

    console.log('Running migrations and seeds...');
    for (const { cmd, env } of migrationCommands) {
      await runCommand(cmd, env);
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabases();
