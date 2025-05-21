import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration object containing all environment variables
 */
export const config = {
  api: {
    host: process.env.PEOPLE_COUNTING_API_HOST || 'localhost',
    port: Number(process.env.PEOPLE_COUNTING_API_PORT) || 3001,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.PEOPLE_COUNTING_DB_NAME || 'people_counting_db',
  },
};
