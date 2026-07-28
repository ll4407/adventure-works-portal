import { Link } from "react-router"
import clsx from "clsx"
import styles from '../ProductSubpage.module.css'
import { Edit, Delete, ChevronDown } from "../../../icons"

    
const CatalogRow = ({prod}) => {
    return (
        <Link 
            aria-label={`View ${prod.productName} details`}
            to={`/products/catalog/${prod.productId}`}
            className={styles.catalogProductCard}>
            <div className={clsx(styles.column, styles.catalogCol1)}>
                <img src={prod.thumbnailPhoto?.startsWith('/') || prod.thumbnailPhoto?.startsWith('http') ? prod.thumbnailPhoto : `data:image/jpg;base64,${prod.thumbnailPhoto}`} alt={prod.productName} className={styles.productImage} />
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
        </Link>
)}

export default CatalogRow