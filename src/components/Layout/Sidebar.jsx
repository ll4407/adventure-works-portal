import { Close, Hamburger } from "../../icons"
import styles from './Layout.module.css'
import { colors } from "../../utilities"
import { useState } from "react"
import Nav from "./Nav"

export default function Sidebar(){
    const [open, setOpen] = useState(false)

    return(
            <div className={styles.sideBar}>

                <div className={styles.sideBarHeader}>
                    <button onClick={() => setOpen(x => !x)} className={styles.sideBarBtn}>
                        {open ? 
                            <Close size={30} color={colors.white} /> :
                            <Hamburger size={30} color={colors.white} />
                            }
                    </button>
                    {open && <div  className={styles.sideBarImgDiv}><img src="/public/LogoWhite.svg" alt=""/></div>}
                </div>
                <Nav open={open} sideNav />
            </div>
    )
}