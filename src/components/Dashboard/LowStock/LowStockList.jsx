import clsx from 'clsx'
import { Alert } from '../../../icons'
import styles from './LowStock.module.css'
import { colors } from '../../../utilities'
import { Link } from 'react-router'

const LowStockList = ({products}) => {

  return (
    <div className={styles.lowStockContainer}>
        {products.map((prod) => {
            return (
                <div className={styles.lowStockCard} key={prod.productId}>
                    <div className={styles.cardTop}>
                        <div className={styles.flexCol}>
                            <div className={styles.flex}>
                                <p className={styles.productName}>
                                    {prod.productName}
                                </p>
                                <Alert color={colors.red} />
                            </div>
                            <p className={styles.lowStockText}>Low Stock</p>
                        </div>
                        <div className={clsx(styles.flexCol, styles.alignCenter)}>
                            <p className={styles.stockLevel}>
                                {prod.stockLevel}
                            </p>
                            <p className={styles.units}>
                                units
                            </p>
                        </div>
                    </div>
                    <div className={clsx(styles.flex, styles.buttonContainer)}>
                        <Link to={`/products/catalog/${prod.productId}`} className={clsx(styles.button, styles.update)}>
                            Update
                        </Link>
                        <button className={clsx(styles.button, styles.order)}>
                            Order
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default LowStockList