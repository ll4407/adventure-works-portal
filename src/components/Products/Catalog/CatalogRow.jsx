    import React from "react"
    import clsx from "clsx"
    import styles from '../../../container/Products/Products.module.css'
    import { Edit, Delete, ChevronDown } from "../../../icons"
    
    const CatalogRow = React.memo(({prod, onClick}) => (
        <button key={prod.productId} onClick={() => onClick(prod)} className={styles.catalogProductCard}>
            <div className={clsx(styles.column, styles.catalogCol1)}>
                <img src={prod.thumbnailPhoto} alt={prod.productName} className={styles.productImage} />
            </div>
            <p className={clsx(styles.column, styles.catalogCol2)}>
                {prod.name}
                <span>{prod.productId}</span>
            </p>
            <p className={clsx(styles.column, styles.catalogCol3)}>{prod.productNumber}</p>
            <p className={clsx(styles.column, styles.catalogCol4)}>{prod.color}</p>
            <p className={clsx(styles.column, styles.catalogCol5)}>{prod.listPrice}</p>
            <div className={clsx(styles.catalogCol6)}>
                <Edit/>
                <Delete />
            </div>
            <ChevronDown size={30} className={styles.chevron} />
        </button>
    ))

    export default CatalogRow