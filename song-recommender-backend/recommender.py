import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler

FEATURES = ["danceability", "energy", "valence", "tempo", "acousticness", "loudness", "speechiness", "instrumentalness"]

def find_song(conn, track_name: str, artist: str = None):
    cursor = conn.cursor()
    if artist:
        cursor.execute(
            "SELECT * FROM songs WHERE LOWER(track_name) LIKE ? AND LOWER(artists) LIKE ? LIMIT 1",
            (f"%{track_name.lower()}%", f"%{artist.lower()}%")
        )
    else:
        cursor.execute(
            "SELECT * FROM songs WHERE LOWER(track_name) LIKE ? LIMIT 1",
            (f"%{track_name.lower()}%",)
        )
    return cursor.fetchone()

def get_recommendations(conn, input_song, n=10):
    cursor = conn.cursor()

    cursor.execute("PRAGMA table_info(songs)")
    cols = [row["name"] for row in cursor.fetchall()]
    features = [f for f in FEATURES if f in cols]

    select_cols = ", ".join(["track_name", "artists"] + features)
    cursor.execute(f"SELECT {select_cols} FROM songs")
    all_songs = cursor.fetchall()

    all_vecs = np.array([[row[f] for f in features] for row in all_songs], dtype=float)
    input_vec = np.array([[input_song[f] for f in features]], dtype=float)

    scaler = MinMaxScaler()
    all_vecs_scaled = scaler.fit_transform(all_vecs)
    input_vec_scaled = scaler.transform(input_vec)

    scores = cosine_similarity(input_vec_scaled, all_vecs_scaled)[0]

    input_name = input_song["track_name"].lower()
    input_artist = input_song["artists"].lower()
    for i, row in enumerate(all_songs):
        if row["track_name"] and row["artists"] and row["track_name"].lower() == input_name and row["artists"].lower() == input_artist:
            scores[i] = -1

    top_indices = scores.argsort()[::-1][:n]

    return [
        {
            "track_name": all_songs[i]["track_name"],
            "artist": all_songs[i]["artists"],
            "score": round(float(scores[i]), 4)
        }
        for i in top_indices
    ]