import styles from './Layout.module.css'
import { Link } from 'react-router'

export default function MobileMenu(){
    return (
        <div className={`${styles.mobileMenu}`}>
            <nav>
                <ul>
                    <li>
                        <Link to={'/'}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={'/employees'}>Employees</Link>
                    </li>
                    <li>
                        <Link to={'/products'}>Products</Link>
                    </li>
                    <li>
                        <Link to={'/purchasing'}>Purchasing</Link>
                    </li>
                    <li>
                        <Link to={'/sales'}>Sales</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}