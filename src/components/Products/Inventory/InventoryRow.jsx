import { Link } from 'react-router'
import clsx from 'clsx'

import { Edit, Delete, ChevronDown } from '../../../icons'

import styles from '../ProductSubpage.module.css'


function InventoryRow({prod, setActiveProduct}) {
  return (
        <Link
            to={`/products/inventory/${prod.productId}/${prod.locationId}`}
            aria-label={`View ${prod.productName} details`} 
            className={styles.productCard} 
            onClick={() => setActiveProduct(prod)}>
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
        </Link>
  )
}

export default InventoryRow