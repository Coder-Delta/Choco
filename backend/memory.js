import Database from "better-sqlite3";

const db = new Database("memory.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export function saveMemory(role, content) {
  db.prepare(
    "INSERT INTO memory (role, content) VALUES (?, ?)"
  ).run(role, content);
}

export function recallMemory(limit = 6) {
  return db.prepare(
    "SELECT role, content FROM memory ORDER BY id DESC LIMIT ?"
  ).all(limit).reverse();
}
