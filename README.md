# match 🎵

A song recommender app — enter a song you love and get recommendations based on it.

> Built as a demo using a Kaggle dataset. Library coverage is limited, but the matching works.

## Screenshots

![Home Page](screenshots/homepage.png)
![Start Page](screenshots/startpage.png)

## Tech Stack

- React + Vite
- CSS Modules
- iTunes Search API
- FastAPI (Python backend)

## Getting Started

**Backend** — runs on `http://localhost:8000`
```bash
uvicorn main:app --reload
```

**Frontend** — runs on `http://localhost:5173`
```bash
npm install
npm run dev
```

## Notes

- Not all songs will be in the dataset
- Recommendations are based on audio features — danceability, energy, valence, tempo, acousticness, loudness, speechiness, and instrumentalness
- Similarity is calculated using cosine similarity with min-max scaling