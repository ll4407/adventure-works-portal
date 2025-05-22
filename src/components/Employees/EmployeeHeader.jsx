import clsx from "clsx"

import styles from './Overview.module.css'

function EmployeeHeader() {
  return (
        <div className={clsx(styles.employeeCard, styles.tableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.col1)}>
                Employee
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col2)}>
                Shifts
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col3)}>
                Job Title
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col4)}>
                Department
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col5)}>
                Employee ID
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col6)}>
                Start Date
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col7)}>
                Options
            </p>
        </div>
  )
}

export default EmployeeHeader