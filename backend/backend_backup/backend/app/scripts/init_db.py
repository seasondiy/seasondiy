# backend/app/data/init_db.py
import sqlite3, pathlib

DB = pathlib.Path(__file__).with_name("seasondiy.db")
conn = sqlite3.connect(DB)
cur = conn.cursor()
cur.execute("""
CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  created_at TEXT,
  lang TEXT,
  undertone TEXT,
  season TEXT,
  tone_grade INTEGER,
  palette_hex TEXT,
  hair_suggestions TEXT,
  quality_flags TEXT
);
""")
conn.commit()
conn.close()
print(f"Created {DB}")
