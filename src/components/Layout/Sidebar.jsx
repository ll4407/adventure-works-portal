import { Hamburger } from "../../icons"
import styles from './Layout.module.css'
import { colors } from "../../utilities"

export default function Sidebar(){
    return(
            <div className={styles.sideBar}>
                <Hamburger size={40} color={colors.white} />
            </div>
    )
}