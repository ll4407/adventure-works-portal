import clsx from "clsx"

import styles from '../../../container/Products/Products.module.css'

function InventoryHeader() {
  return (
        <div className={clsx(styles.productCard, styles.tableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.col1)}>
                Product Name
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col2)}>
                Qty
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col3)}>
                Product ID
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col4)}>
                Location
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col5)}>
                Shelf
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col6)}>
                Bin
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col7)}>
                Options
            </p>
        </div>
  )
}

export default InventoryHeader