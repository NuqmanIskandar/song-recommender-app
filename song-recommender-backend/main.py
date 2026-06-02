from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import init_db
from routes import songs, recommend

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # runs on startup
    yield

app = FastAPI(title="Song Recommender API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "https://your-app.vercel.app"  # replace with your Vercel URL later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(songs.router)
app.include_router(recommend.router)

@app.get("/")
def root():
    return {"message": "Song Recommender API is running"}