import { useState } from "react"
import { colors } from "../../utilities"
import styles from './Layout.module.css'
import { UserIcon, Hamburger, Close } from "../../icons"
import MobileMenu from './MobileMenu'

export default function TopNav(){
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    return (
        <div className={styles.topNav}>
            <button className={styles.hamburger} onClick={() => setShowMobileMenu(x => !x)}>
                {showMobileMenu ? <Close size={40} color={colors.black} /> : <Hamburger size={40} color={colors.black} />}
            </button>
            <img className={styles.logo} alt='' src='/public/logo.svg' />
            <button className={styles.avatar}>
                <UserIcon size={40} color={colors.black}/>
            </button>
            {showMobileMenu && <MobileMenu />}
        </div>
    )
}