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
        "https://your-app.vercel.app",  # replace with your Vercel URL later
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
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