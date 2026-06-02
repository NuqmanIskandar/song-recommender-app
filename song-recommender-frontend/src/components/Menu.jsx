import styles from "./Menu.module.css"
import matchLogo from '../assets/match_logo-cropped.svg'
import portada from "../assets/portada.jpeg"
import { useNavigate } from "react-router-dom"

const Menu = () => {

    const navigate = useNavigate()

    return(
        <>
            <div className={styles.menuPage}>
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
                <div className={styles.canvasWrapper}>
                    <div className={styles.textDiv}>
                        <div className={styles.textBox}>
                            <div className={styles.infoDiv}>
                                <p className={styles.welcome}>Welcome, Your Mood. Your Music.</p>
                                <p className={styles.description}>Discover music that matches your mood. Tell us what you're feeling, and we'll find the perfect songs for you.</p>
                            </div>
                            <div className={styles.infoButtonDiv}>
                                <button className={styles.startButton} onClick={() => navigate("/start")}>Start Now</button>
                                <button className={styles.learnButton}>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgDiv}>
                        <img src={portada}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu