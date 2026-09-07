import pg from "pg";

const { Pool } = pg;

// Singleton pool instance for server-side PostgreSQL queries
let pool: pg.Pool | undefined;

export function getDbPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.PGHOST || "168.119.64.101",
      port: parseInt(process.env.PGPORT || "5432", 10),
      database: process.env.PGDATABASE || "soupa839",
      user: process.env.PGUSER || "soupa839",
      password: process.env.PGPASSWORD || "5yLMTWjNFmPByXLA8d47Zvdnz",
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL client error:", err);
    });
  }
  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const p = getDbPool();
  try {
    const res = await p.query(text, params);
    return res.rows as T[];
  } catch (err) {
    console.error("PostgreSQL Query Error:", { text, params, err });
    throw err;
  }
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows.length > 0 ? rows[0] : null;
}
