import { Close, DashboardIcon, Employees, Hamburger, Products, Purchasing, Sales, Settings } from "../../icons"
import styles from './Layout.module.css'
import { colors } from "../../utilities"
import { NavLink, useLocation } from "react-router"
import { useState } from "react"

export default function Sidebar(){
    const location = useLocation()
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
                <nav className={styles.sideNav}>
                    <ul>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Yellow ${location.pathname == '/dashboard' ? 
                                " BGYellow" 
                                : ""}`} to={'/dashboard'}>
                                <DashboardIcon color={location.pathname == '/dashboard' ? colors.black : undefined}/>
                                <div className={open && styles.open}>
                                    <p>Dashboard</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Orange ${location.pathname == '/employees' ? 
                                " BGOrange" 
                                : ""}`} to={'/employees'}>
                                <Employees color={location.pathname == '/employees' ? colors.black : undefined} />
                                <div className={open && styles.open}>
                                    <p>Employees</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Blue ${location.pathname == '/products' ? 
                                " BGBlue" 
                                : ""}`} to={'/products'}>
                                <Products color={location.pathname == '/products' ? colors.black : undefined}/>
                                <div className={open && styles.open}>
                                    <p>Products</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Green ${location.pathname == '/purchasing' ? 
                                " BGGreen" 
                                : ""}`} to={'/purchasing'}>
                                <Purchasing color={location.pathname == '/purchasing' ? colors.black : undefined}/>
                                <div className={open && styles.open}>
                                    <p>Purchasing</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Pink ${location.pathname == '/sales' ? 
                                " BGPink" : ""}`} to={'/sales'}>
                                <Sales color={location.pathname == '/sales' ? colors.black : undefined}/>
                                <div className={open && styles.open}>
                                    <p>Sales</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={`${styles.sideNavLink} Gray ${location.pathname == '/settings' ? 
                                " BGGray" 
                                : ""}`} to={'/settings'}>
                                <Settings color={location.pathname == '/settings' ? colors.black : undefined}/>
                                <div className={open && styles.open}>
                                    <p>Settings</p>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}