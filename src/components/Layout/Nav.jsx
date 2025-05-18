import styles from './Layout.module.css'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'
import {colors} from '../../utilities'
import {DashboardIcon, Employees, Products, Purchasing, Sales, Settings} from '../../icons'
import clsx from 'clsx'

const Nav = ({open = true, sideNav, setOpen}) =>{
    const location = useLocation()
    return(
        <nav className={clsx(styles.nav, sideNav && styles.sideNav)}>
            <ul>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            styles.navLink, 
                            "Yellow",
                            location.pathname.toLowerCase().includes('dashboard') && "BGYellow" )} 
                        to={'/dashboard'}>
                        <DashboardIcon color={location.pathname.toLowerCase().includes('dashboard') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Dashboard</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            styles.navLink,
                            "Orange",
                            location.pathname.toLowerCase().includes('employees') && "BGOrange" )}
                        to={'/employees'}>
                        <Employees color={location.pathname.toLowerCase().includes('employees') ? colors.black : undefined} />
                        <div className={open ? styles.open : ""}>
                            <p>Employees</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Blue",
                            styles.navLink,
                            location.pathname.toLowerCase().includes('products') && "BGBlue"
                            )} 
                        to={'/products/inventory'}>
                        <Products color={location.pathname.toLowerCase().includes('products') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Products</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        onClick={() => setOpen(false)} 
                        className={clsx(
                            "Green",
                            styles.navLink,
                            location.pathname.toLowerCase().includes('purchasing') && "BGGreen"
                            )} 
                        to={'/purchasing'}>
                        <Purchasing color={location.pathname.toLowerCase().includes('purchasing') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Purchasing</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Pink",
                            styles.navLink,
                            location.pathname.toLowerCase().includes('sales') && "BGPink"
                        )} 
                        to={'/sales'}>
                        <Sales color={location.pathname.toLowerCase().includes('sales') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Sales</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Gray",
                            styles.navLink,
                            location.pathname.toLowerCase().includes('settings') && "BGGray"
                        )} 
                        to={'/settings'}>
                        <Settings color={location.pathname.toLowerCase().includes('settings') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Settings</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav