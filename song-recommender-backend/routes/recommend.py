from fastapi import APIRouter, HTTPException
from database import get_conn
from recommender import find_song, get_recommendations
from models import RecommendResponse

router = APIRouter(prefix="/recommend", tags=["recommend"])

@router.get("/", response_model=RecommendResponse)
def recommend(track_name: str, artist: str = None):
    conn = get_conn()
    song = find_song(conn, track_name, artist)

    if not song:
        conn.close()
        raise HTTPException(
            status_code=404,
            detail=f"'{track_name}' not found in database. Try a different song."
        )

    results = get_recommendations(conn, song)
    conn.close()

    return RecommendResponse(input=track_name, recommendations=results)