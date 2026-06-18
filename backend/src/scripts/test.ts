import { pool } from "../db/pool";

async function check() {
  const db = await pool.query("SELECT current_database()");
  console.log("DB:", db.rows[0]);

  const tables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);

  console.log("Tables:", tables.rows);
}

check().finally(() => pool.end());