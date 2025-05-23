import styles from './Layout.module.css'
import { NavLink } from 'react-router'
import { useLocation } from 'react-router'
import {colors} from '../../utilities'
import {ChevronDown, DashboardIcon, Employees, Products, Purchasing, Sales, Settings} from '../../icons'
import clsx from 'clsx'

const Nav = ({open = true, sideNav, setOpen}) =>{
    const location = useLocation()

    const path = location.pathname.toLowerCase()
    return(
        <nav className={clsx(styles.nav, sideNav && styles.sideNav)}>
            <ul>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            styles.navLink, 
                            "Yellow",
                            path.includes('dashboard') && "BGYellow" )} 
                        to={'/dashboard'}>
                        <DashboardIcon color={path.includes('dashboard') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Dashboard</p>
                            {path.includes('dashboard') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            styles.navLink,
                            "Orange",
                            path.includes('employees') && "BGOrange" )}
                        to={'/employees'}>
                        <Employees color={path.includes('employees') ? colors.black : undefined} />
                        <div className={open ? styles.open : ""}>
                            <p>Employees</p>
                            {path.includes('employees') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Blue",
                            styles.navLink,
                            path.includes('products') && "BGBlue"
                            )} 
                        to={'/products/inventory'}>
                        <Products color={path.includes('products') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Products</p>
                            {path.includes('products') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        onClick={() => setOpen(false)} 
                        className={clsx(
                            "Green",
                            styles.navLink,
                            path.includes('purchasing') && "BGGreen"
                            )} 
                        to={'/purchasing'}>
                        <Purchasing color={path.includes('purchasing') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Purchasing</p>
                            {path.includes('purchasing') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Pink",
                            styles.navLink,
                            path.includes('sales') && "BGPink"
                        )} 
                        to={'/sales'}>
                        <Sales color={path.includes('sales') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Sales</p>
                            {path.includes('sales') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={() => setOpen(false)}
                        className={clsx(
                            "Gray",
                            styles.navLink,
                            path.includes('settings') && "BGGray"
                        )} 
                        to={'/settings'}>
                        <Settings color={path.includes('settings') ? colors.black : undefined}/>
                        <div className={open ? styles.open : ""}>
                            <p>Settings</p>
                            {path.includes('settings') && <ChevronDown size={20} className={clsx(styles.chevron, open && styles.open)} color={colors.white} />}
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav