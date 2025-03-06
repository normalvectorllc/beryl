import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dbDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Database file path
const dbPath = path.join(dbDir, 'tasks.sqlite');

// Create and initialize database connection
let db: Database | null = null;

/**
 * Initialize the database connection
 */
export const initializeDatabase = async (): Promise<Database> => {
  if (db) return db;
  
  // Open database connection
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  
  // Enable foreign keys
  await db.exec('PRAGMA foreign_keys = ON');
  
  return db;
};

/**
 * Get the database connection
 * @throws Error if database is not initialized
 */
export const getDatabase = (): Database => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
};

export default {
  initialize: initializeDatabase,
  get: getDatabase,
};