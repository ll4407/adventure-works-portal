
import styles from './Layout.module.css';
import TopNav from './TopNav';

export default function Layout({children}){


    return(
        <div className={styles.layoutWrapper}>
            <Sidebar />
            <div className={styles.mainWrapper}>
                <TopNav />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}