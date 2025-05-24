import clsx from "clsx"

import styles from '../ProductSubpage.module.css'

function InventoryHeader(props) {
  const { handleSort } = props;

  return (
        <div className={clsx(styles.productCard, styles.tableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.col1)}
            onClick={() => {handleSort("productName", "name"); }}
            >
                Product Name
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col2)}
            onClick={() => {handleSort("quantity", ""); }}
            >
                Qty
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col3)}
            onClick={() => {handleSort("productId", ""); }}
            >
                Product ID
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col4)}
            onClick={() => {handleSort("locationName", "name"); }}
            >
                Location
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col5)}
            onClick={() => {handleSort("shelf", "name"); }}
            >
                Shelf
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col6)}
            onClick={() => {handleSort("bin", ""); }}
            >
                Bin
            </p>
            <p className={clsx(styles.column, styles.bold, styles.col7)}>
                Options
            </p>
        </div>
  )
}

export default InventoryHeader