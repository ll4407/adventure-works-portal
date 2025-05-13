import clsx from "clsx"
import styles from '../../../container/Products/Products.module.css'

const CatalogHeader = () =>{
    return (
        <div className={clsx(styles.catalogProductCard, styles.catalogTableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol1)}>
                Image
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol2)}>
                Product Name
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol3)}>
                Number
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol4)}>
                Color
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol5)}>
                List Price
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol6)}>
                Options
            </p>
        </div>

    )
}

export default CatalogHeader