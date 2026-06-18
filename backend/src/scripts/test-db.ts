import { pool } from "../db/pool";

async function testDB() {
  console.log("🔌 starting query...");

  const result = await pool.query("SELECT NOW()");

  console.log("DB time:", result.rows[0]);
}

testDB()
  .then(() => {
    console.log("done");
    return pool.end();
  })
  .catch((err) => {
    console.error("DB error:", err);
    pool.end();
  });