import { useState } from 'react';
import { Outlet } from 'react-router';

import clsx from 'clsx';

import Sidebar from './Sidebar';
import TopNav from './TopNav';

import styles from './Layout.module.css';

export default function Layout(){
    const [open, setOpen] = useState(false)

    return(
        <div className={styles.layoutWrapper}>
            <Sidebar open={open} setOpen={setOpen} />
            <div className={styles.mainWrapper}>
                <TopNav />
                <main className={clsx(styles.main, open && styles.mainOpen)}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}