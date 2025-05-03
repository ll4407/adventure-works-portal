import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import TopNav from './TopNav';
import { Outlet } from 'react-router';

export default function Layout(){


    return(
        <div className={styles.layoutWrapper}>
            <Sidebar />
            <div className={styles.mainWrapper}>
                <TopNav />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}