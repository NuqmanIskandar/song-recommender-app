from fastapi import APIRouter
from database import get_conn
from recommender import find_song
from models import SongSearchResult

router = APIRouter(prefix="/songs", tags=["songs"])

@router.get("/search", response_model=SongSearchResult)
def search_song(track_name: str, artist: str = None):
    conn = get_conn()
    song = find_song(conn, track_name, artist)
    conn.close()

    if not song:
        return SongSearchResult(found=False, message="Song not found in our database")

    return SongSearchResult(
        found=True,
        track_name=song["track_name"],
        artist=song["artists"]
    )