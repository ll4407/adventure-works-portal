import clsx from "clsx"

import styles from './Overview.module.css'

function EmployeeHeader(props) {
  const { handleSort } = props;

  return (
        <div className={clsx(styles.employeeCard, styles.tableHeader)}>
            <button 
                aria-label="Sort by last name"
                className={clsx(styles.column, styles.bold, styles.col1)}
                onClick={() => {handleSort("lastName", "name"); }}
            >
                Employee&#x25BE;
            </button>
            <button aria-label="Sort by shift" className={clsx(styles.column, styles.bold, styles.col2)}
            onClick={() => {handleSort("shift", "name");}}
            >
                Shifts&#x25BE;
            </button>
            <button aria-label="Sort by Job Title" className={clsx(styles.column, styles.bold, styles.col3)}
            onClick={() => {handleSort("jobTitle", "name");}}
            >
                Job Title&#x25BE;
            </button>
            <button aria-label="Sort by department" className={clsx(styles.column, styles.bold, styles.col4)}
            onClick={() => {handleSort("department", "name");}}
            >
                Department&#x25BE;
            </button>
            <button aria-label="Sort by Employee Id" className={clsx(styles.column, styles.bold, styles.col5)}
            onClick={() => {handleSort("employeeId", "");}}
            >
                Employee ID&#x25BE;
            </button>
            <button aria-label="Sort by date hired" className={clsx(styles.column, styles.bold, styles.col6)}
            onClick={() => {handleSort("hireDate", "name");}}
            >
                Start Date&#x25BE;
            </button>
            <p className={clsx(styles.column, styles.bold, styles.col7)}>
                Options
            </p>
        </div>
  )
}

export default EmployeeHeader