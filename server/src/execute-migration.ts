import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../drizzle/0000_dazzling_bulldozer.sql'), 'utf8');
    const statements = sql.split('--> statement-breakpoint');
    
    await client.connect();
    console.log('Connected to database');
    
    for (const stmt of statements) {
      if (!stmt.trim()) continue;
      try {
        await client.query(stmt);
        // console.log('Successfully executed statement');
      } catch (err: any) {
        console.error('Error executing statement:');
        console.error(stmt);
        console.error('Error:', err.message);
        console.error('Routine:', err.routine);
        throw err;
      }
    }
    
    console.log('All migration statements executed successfully');
    await client.end();
  } catch (err: any) {
    process.exit(1);
  }
}

run();
