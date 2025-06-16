const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const PG_USER = 'postgres';
const PG_PASSWORD = 'pass';
const PG_HOST = 'localhost';
const PG_PORT = '5432';

async function runCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command);
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
    `PGPASSWORD=${PG_PASSWORD} psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "DROP DATABASE IF EXISTS sensor_db;"`,
    `PGPASSWORD=${PG_PASSWORD} psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "DROP DATABASE IF EXISTS people_counting_db;"`,
  ];

  const createCommands = [
    `PGPASSWORD=${PG_PASSWORD} psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "CREATE DATABASE sensor_db;"`,
    `PGPASSWORD=${PG_PASSWORD} psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -c "CREATE DATABASE people_counting_db;"`,
  ];

  // Run migrations and seeds
  const migrationCommands = [
    'cd sensor-system/sensor-api && pnpm migrate && pnpm seed',
    'cd people-counting-system/people-counting-api && pnpm migrate && pnpm seed',
    `PGPASSWORD=${PG_PASSWORD} psql -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -d people_counting_db -f people-counting-system/migrations/backfill-counts.sql`,
  ];

  try {
    console.log('Dropping existing databases...');
    for (const cmd of dropCommands) {
      await runCommand(cmd);
    }

    console.log('Creating fresh databases...');
    for (const cmd of createCommands) {
      await runCommand(cmd);
    }

    console.log('Running migrations and seeds...');
    for (const cmd of migrationCommands) {
      await runCommand(cmd);
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabases();
