
import styles from './Layout.module.css';
import Hamburger from '../../icons/Hamburger';
import { colors } from '../../utilities';
import TopNav from './TopNav';

export default function Layout({children}){


    return(
        <div className={styles.layoutWrapper}>
            <div className={styles.sideBar}>
                <Hamburger size={40} color={colors.white} />
            </div>
            <div className={styles.mainWrapper}>
                <TopNav />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}