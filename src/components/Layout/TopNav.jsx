import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../../store/account"
import { colors } from "../../utilities"
import styles from './Layout.module.css'
import { UserIcon, Hamburger, Close } from "../../icons"
import Nav from "./Nav"

export default function TopNav(){
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { account } = useSelector(state => state.account)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }

    return (
        <div className={styles.topNav}>
            <button aria-label="toggle menu open/closed" className={styles.hamburger} onClick={() => setShowMobileMenu(x => !x)}>
                {showMobileMenu ? <Close size={40} color={colors.black} /> : <Hamburger size={40} color={colors.black} />}
            </button>
            <img className={styles.logo} alt='' src='/LogoThickDark.svg' />
            <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button className={styles.avatar} onClick={() => setShowDropdown(x => !x)}>
                    <UserIcon size={40} color={colors.black}/>
                </button>
                {showDropdown && (
                    <div className={styles.profileDropdown}>
                        <p className={styles.profileName}>{account?.firstName || "User"} {account?.lastName || ""}</p>
                        <p className={styles.profileEmail}>{account?.email || "user@company.com"}</p>
                        <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
            {showMobileMenu && (        
                <div className={`${styles.mobileMenu}`}>
                    <Nav setOpen={setShowMobileMenu} />
                </div>)}
        </div>
    )
}