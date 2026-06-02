import styles from "./Menu.module.css"
import matchLogo from '../assets/match_logo-cropped.svg'

const Menu = () => {
    return(
        <>
            <div className={styles.menuPage}>
                <div className={styles.navBar}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.imageLogo} src={matchLogo}/>
                    </div>
                    <div className={styles.profile}>
                        <p>Test</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu