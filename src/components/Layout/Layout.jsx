import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import TopNav from './TopNav';
import { Outlet } from 'react-router';
import { useState } from 'react';

export default function Layout(){
    const [open, setOpen] = useState(false)

    return(
        <div className={styles.layoutWrapper}>
            <Sidebar open={open} setOpen={setOpen} />
            <div className={styles.mainWrapper}>
                <TopNav />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}