import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    console.log('Connecting to:', process.env.DATABASE_URL);
    await client.connect();
    console.log('Successfully connected to database');
    const res = await client.query('SELECT current_database()');
    console.log('Current database:', res.rows[0].current_database);
    await client.end();
  } catch (err: any) {
    console.error('Connection error details:');
    console.error('Code:', err.code);
    console.error('Message:', err.message);
    console.error('Detail:', err.detail);
    process.exit(1);
  }
}

test();
