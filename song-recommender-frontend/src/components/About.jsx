import styles from "./About.module.css"
import matchLogo from '../assets/match_logo-cropped.svg'

const About = () => {
    return(
        <>
            <div className={styles.aboutPage}>
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
                    <div className={styles.insideWrapper}>
                        <p className={styles.header}>Find your next favourite song.</p>
                        <p className={styles.description}>This is a demo — built with a Kaggle dataset, so the library is limited, but the matching works. Drop a song in and see what comes up.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About