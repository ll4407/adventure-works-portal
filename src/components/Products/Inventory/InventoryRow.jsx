import clsx from 'clsx'
import styles from '../../../container/Products/Products.module.css'
import { Edit, Delete, ChevronDown } from '../../../icons'

function InventoryRow({prod, onClick}) {
  return (
        <button 
            key={prod.productId + prod.productName + prod.locationId + prod.locationName} 
            className={styles.productCard} 
            onClick={onClick}>
            <div className={clsx(styles.column, styles.col1)}>
                <p className={styles.productName}>{prod.productName}</p>
                <p className={styles.extraLocation}>{prod.locationName}</p>
            </div>
            <p className={clsx(styles.column, styles.col2)}><span className={styles.quantitySpan}>QTY </span>{prod.quantity}</p>
            <p className={clsx(styles.column, styles.col3)}>{prod.productId}</p>
            <p className={clsx(styles.column, styles.col4)}>{prod.locationName}</p>
            <p className={clsx(styles.column, styles.col5)}>{prod.shelf}</p>
            <p className={clsx(styles.column, styles.col6)}>{prod.bin}</p>
            <div className={clsx(styles.col7)}>
                <Edit/>
                <Delete />
            </div>
            <ChevronDown size={30} className={styles.chevron} />
        </button>
  )
}

export default InventoryRow