import { Link } from 'react-router'
import clsx from 'clsx'
import styles from './Overview.module.css'

import { Edit, ChevronDown, Delete } from '../../icons'



function EmployeeRow({employee, setActiveEmployee}) {
  return (
        <Link
            to={`/employees/${employee.employeeId}`}
            aria-label={`View ${employee.employeeName} details`} 
            className={styles.employeeCard} 
            onClick={() => setActiveEmployee(employee)}>
            <div className={clsx(styles.column, styles.col1)}>
                <p className={styles.employeeName}>{employee.firstName} {employee.lastName}</p>
                <p className={styles.extraTitle}>{employee.jobTitle}</p>
            </div>
            <p className={clsx(styles.column, styles.col2)}>{employee.shift}</p>
            <p className={clsx(styles.column, styles.col3)}>{employee.jobTitle}</p>
            <p className={clsx(styles.column, styles.col4)}>{employee.department}</p>
            <p className={clsx(styles.column, styles.col5)}>{employee.employeeId}</p>
            <p className={clsx(styles.column, styles.col6)}>{new Date(employee.hireDate).toLocaleDateString()}</p>
            <div className={clsx(styles.col7)}>
                <Edit/>
                <Delete />
            </div>
            <ChevronDown size={30} className={styles.chevron} />
        </Link>
  )
}

export default EmployeeRow