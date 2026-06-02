from pydantic import BaseModel
from typing import Optional

class SongSearchResult(BaseModel):
    found: bool
    track_name: Optional[str] = None
    artist: Optional[str] = None
    message: Optional[str] = None

class RecommendedSong(BaseModel):
    track_name: str
    artist: str
    score: float

class RecommendResponse(BaseModel):
    input: str
    recommendations: list[RecommendedSong]