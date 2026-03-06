import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;

const sqlPath = resolve(process.cwd(), "tmp-reset-auth-schema.sql");
const sql = await readFile(sqlPath, "utf8");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();
  await client.query(sql);
  process.stdout.write("Auth schema reset completed\n");
} finally {
  await client.end();
}
