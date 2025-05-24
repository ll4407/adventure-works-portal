import clsx from "clsx"
import styles from '../ProductSubpage.module.css'

const CatalogHeader = (props) =>{
    const { handleSort } = props;

    return (
        <div className={clsx(styles.catalogProductCard, styles.catalogTableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol1)}>
                Image
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol2)}
            onClick={() => {handleSort("name", "name"); }}
            >
                Product Name
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol3)}
            onClick={() => {handleSort("productNumber", "name"); }}
            >
                Number
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol4)}
            onClick={() => {handleSort("color", "name"); }}
            >
                Color
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol5)}
            onClick={() => {handleSort("listPrice", ""); }}
            >
                List Price
            </p>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol6)}>
                Options
            </p>
        </div>

    )
}

export default CatalogHeader