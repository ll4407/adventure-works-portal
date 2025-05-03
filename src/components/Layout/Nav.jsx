import styles from './Layout.module.css'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'
import {colors} from '../../utilities'
import {DashboardIcon, Employees, Products, Purchasing, Sales, Settings} from '../../icons'
import clsx from 'clsx'

const Nav = ({open = true, sideNav}) =>{
    const location = useLocation()
    return(
        <nav className={clsx(styles.nav, sideNav && styles.sideNav)}>
            <ul>
                <li>
                    <NavLink 
                        className={clsx(
                            styles.navLink, 
                            "Yellow",
                            location.pathname == '/dashboard' && "BGYellow" )} 
                        to={'/dashboard'}>
                        <DashboardIcon color={location.pathname == '/dashboard' ? colors.black : undefined}/>
                        <div className={open && styles.open}>
                            <p>Dashboard</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={clsx(
                            styles.navLink,
                            "Orange",
                            location.pathname == '/employees' && "BGOrange" )}
                        to={'/employees'}>
                        <Employees color={location.pathname == '/employees' ? colors.black : undefined} />
                        <div className={open && styles.open}>
                            <p>Employees</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={clsx(
                            "Blue",
                            styles.navLink,
                            location.pathname == "/products" && "BGBlue"
                            )} 
                        to={'/products'}>
                        <Products color={location.pathname == '/products' ? colors.black : undefined}/>
                        <div className={open && styles.open}>
                            <p>Products</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={clsx(
                            "Green",
                            styles.navLink,
                            location.pathname == "/purchasing" && "BGGreen"
                            )} 
                        to={'/purchasing'}>
                        <Purchasing color={location.pathname == '/purchasing' ? colors.black : undefined}/>
                        <div className={open && styles.open}>
                            <p>Purchasing</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={clsx(
                            "Pink",
                            styles.navLink,
                            location.pathname == "/sales" && "BGPink"
                        )} 
                        to={'/sales'}>
                        <Sales color={location.pathname == '/sales' ? colors.black : undefined}/>
                        <div className={open && styles.open}>
                            <p>Sales</p>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={clsx(
                            "Gray",
                            styles.navLink,
                            location.pathname == "/settings" && "BGGray"
                        )} 
                        to={'/settings'}>
                        <Settings color={location.pathname == '/settings' ? colors.black : undefined}/>
                        <div className={open && styles.open}>
                            <p>Settings</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav