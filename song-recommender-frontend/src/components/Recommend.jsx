import styles from "./Recommend.module.css"
import matchLogo from '../assets/match_logo-cropped.svg'
import imgPlaceholder from '../assets/picture-placeholder.svg'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Recommend = () => {

    const navigate = useNavigate()

    const [query, setQuery] = useState("top hits 2026")
    const [songs, setSongs] = useState([])
    const [selected, setSelected] = useState({
        image: imgPlaceholder,
        name: "Song name",
        artist: "Artist name"
    })
    const [isSelected, setIsSelected] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [error, setError] = useState("")

    async function choose(songImage, songName, songArtist) {
        setSelected({
            image: songImage,
            name: songName,
            artist: songArtist
        })
        setIsSelected(true)
        setError("")

        // Check if song is in db
        const checkRes = await fetch(`http://localhost:8000/songs/search?track_name=${encodeURIComponent(songName)}`)
        const checkData = await checkRes.json()
        if (!checkData.found) {
            setError("We don't have enough data on this song. Try another!")
            setRecommendations([])
            return
        }

        // get recommendations
        const recRes = await fetch(`http://localhost:8000/recommend/?track_name=${encodeURIComponent(songName)}&artist=${encodeURIComponent(songArtist)}`)
        const recData = await recRes.json()

        // enrich each recommendation with iTunes artwork + preview
        const enriched = await Promise.all(
            recData.recommendations.map(async (rec) => {
                const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(rec.track_name + " " + rec.artist)}&entity=song&limit=1`)
                const data = await res.json()
                const iTunesSong = data.results[0]
                return {
                    ...rec,
                    artwork: iTunesSong?.artworkUrl100 || imgPlaceholder,
                    previewUrl: iTunesSong?.previewUrl
                }
            })
        )

        setRecommendations(enriched)
    }

    function remove() {
        setSelected({
            image: imgPlaceholder,
            name: "Song name",
            artist: "Artist name"
        })
        setIsSelected(false)
        setRecommendations([])
        setError("")
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        const searchQuery = query.trim() === "" ? "top hits 2026" : query

        fetch(`https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=song&limit=5`)
        .then(res => res.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
            setSongs(data.results)
            } else {
            fetch(`https://itunes.apple.com/search?term=top+hits+2026&media=music&entity=song&limit=5`)
            .then(res => res.json())
            .then(fallback => setSongs(fallback.results || []))
            }
        })
        }, 500)

        return () => clearTimeout(timer)
    }, [query])


    return(
        <>
            <div className={styles.startPage}>
                <div className={styles.navBar}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.imageLogo} src={matchLogo}/>
                    </div>
                    <div className={styles.profile}>
                        <span>Demo</span>
                        <span className={styles.divider}></span>
                        <button className={styles.signUpButton} onClick={() => navigate("/about")}>Sign Up</button>
                        <button className={styles.signInButton} onClick={() => navigate("/about")}>Sign In</button>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.findDiv}>
                        <p className={styles.findText}>Find your match</p>
                        <p className={styles.searchText}>Search a song you love.</p>
                        <input className={styles.searchBar} onChange={(e) => setQuery(e.target.value)}/>
                        <div className={styles.searchResult}>
                            {songs.map((song) => (
                                <button className={styles.songBox} key={song.trackId} onClick={() => choose(song.artworkUrl60, song.trackName, song.artistName)}>
                                    <img src={song.artworkUrl60}/>
                                    <div className={styles.barDiv}>
                                        <span className={styles.songName}>{song.trackName}</span>
                                        <span className={styles.songArtist}>{song.artistName}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.recommendDiv}>
                        <p className={styles.recommendText}>Recommended for you</p>
                        <div className={styles.selectedSong}>
                            <img src={selected.image}/>
                            <div className={styles.selectedDiv}>
                                <span className={styles.songName}>{selected.name}</span>
                                <span className={styles.songArtist}>{selected.artist}</span>
                            </div>
                            <button className={styles.removeButton} onClick={() => remove()}>X</button>
                        </div>
                        
                        {error && <p className={styles.errorText}>{error}</p>}

                        <div className={styles.recList}>
                            {recommendations.map((rec, index) => (
                                <div className={styles.songRecBox} key={index}>
                                    <img src={rec.artwork}/>
                                    <div className={styles.barDiv}>
                                        <span className={styles.songName}>{rec.track_name}</span>
                                        <span className={styles.songArtist}>{rec.artist}</span>
                                    </div>
                                    <div className={styles.preview}>
                                        {rec.previewUrl && <audio controls src={rec.previewUrl}/>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recommend