import { Pool, type QueryResult, type QueryResultRow } from 'pg';

import { config } from './config';

let pool: Pool;

/**
 * Creates a new connection pool if it doesn't exist and returns it.
 */
function getPool(): Pool {
  if (!pool) {
    pool = new Pool(config.db);
  }

  return pool;
}

/**
 * Executes a parameterized SQL query using the connection pool.
 */
export const executeQuery = async <T extends QueryResultRow = any>(
  query: string,
  replacements?: any[],
): Promise<T[]> => {
  const currentPool = getPool();

  const result: QueryResult<T> = await currentPool.query<T>(
    query,
    replacements,
  );

  return result.rows;
};
