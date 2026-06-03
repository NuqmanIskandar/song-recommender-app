import styles from "./Recommend.module.css"
import matchLogo from '../assets/match_logo-cropped.svg'
import imgPlaceholder from '../assets/picture-placeholder.png'
import { useState, useEffect } from "react"

const Recommend = () => {

    const [isSelected, setIsSelected] = useState(false)
    const [query, setQuery] = useState("top hits 2026")
    const [songs, setSongs] = useState([])
    const [selected, setSelected] = useState({
        image: imgPlaceholder,
        name: "Song name",
        artist: "Artist name"
    })

    function choose(songImage, songName, songArtist) {
        setSelected({
            image: songImage,
            name: songName,
            artist: songArtist
        })
        setIsSelected(true)
    }

    function remove() {
        setSelected({
            image: imgPlaceholder,
            name: "Song name",
            artist: "Artist name"
        })
        setIsSelected(false)
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
                        <button className={styles.signUpButton}>Sign Up</button>
                        <button className={styles.signInButton}>Sign In</button>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recommend