import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function reset() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Dropping public schema...');
    await client.query('DROP SCHEMA public CASCADE');
    console.log('Creating public schema...');
    await client.query('CREATE SCHEMA public');
    console.log('Granting permissions...');
    await client.query('GRANT ALL ON SCHEMA public TO postgres');
    await client.query('GRANT ALL ON SCHEMA public TO public');
    console.log('Database reset successfully');
    await client.end();
  } catch (err: any) {
    console.error('Reset error:', err.message);
    process.exit(1);
  }
}

reset();
