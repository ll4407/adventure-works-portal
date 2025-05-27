import { Close, Hamburger } from "../../icons"
import styles from './Layout.module.css'
import { colors } from "../../utilities"
import Nav from "./Nav"

export default function Sidebar({open, setOpen}){

    return(
            <div className={styles.sideBar}>

                <div className={styles.sideBarHeader}>
                    <button aria-label={open ? "Close sidebar" : "Open sidebar"} onClick={() => setOpen(x => !x)} className={styles.sideBarBtn}>
                        {open ? 
                            <Close size={30} color={colors.white} /> :
                            <Hamburger size={30} color={colors.white} />
                            }
                    </button>
                    {open && <div className={styles.sideBarImgDiv}><img src="/public/LogoWhite.svg" alt=""/></div>}
                </div>
                <Nav open={open} sideNav setOpen={setOpen} />
            </div>
    )
}