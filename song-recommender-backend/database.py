import sqlite3
import pandas as pd

def init_db():
    conn = sqlite3.connect("songs.db")
    df = pd.read_csv("data/spotify.csv")
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
    df = df.drop_duplicates(subset=["track_name", "artists"])
    df.to_sql("songs", conn, if_exists="replace", index=False)
    conn.close()
    print(f"DB initialized with {len(df)} songs")

def get_conn():
    conn = sqlite3.connect("songs.db")
    conn.row_factory = sqlite3.Row
    return conn