import clsx from "clsx"
import sortedArray from '../../container/SortBy/Sortby'

import styles from './Overview.module.css'

function EmployeeHeader(props) {
  let { list } = props;
  const { handleSort, sortDirection } = props;

  return (
        <div className={clsx(styles.employeeCard, styles.tableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.col1)}
            onClick={() => {handleSort("lastName");
                list = sortedArray(list, "lastName", "name", sortDirection);}}
            >
                Employee
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col2)}
            onClick={() => {handleSort("shift");
                list = sortedArray(list, "shift", "name", sortDirection);}}
            >
                Shifts
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col3)}
            onClick={() => {handleSort("jobTitle");
                list = sortedArray(list, "jobTitle", "name", sortDirection);}}
            >
                Job Title
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col4)}
            onClick={() => {handleSort("department");
                list = sortedArray(list, "department", "name", sortDirection);}}
            >
                Department
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col5)}
            onClick={() => {handleSort("employeeId");
                list = sortedArray(list, "employeeId", "", sortDirection);}}
            >
                Employee ID
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col6)}
            onClick={() => {handleSort("hireDate");
                list = sortedArray(list, "hireDate", "name", sortDirection);}}
            >
                Start Date
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col7)}>
                Options
            </p>
        </div>
  )
}

export default EmployeeHeader