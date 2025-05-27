import clsx from "clsx"
import styles from '../ProductSubpage.module.css'

const CatalogHeader = (props) =>{
    const { handleSort } = props;

    return (
        <div className={clsx(styles.catalogProductCard, styles.catalogTableHeader)}>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol1)}>
                Image
            </p>
            <button
                aria-label="Sort by product name" 
                className={clsx(styles.column, styles.bold, styles.catalogCol2)}
                onClick={() => {handleSort("name", "name"); }}
            >
                Product Name&#x25BE;
            </button>
            <button
                aria-label="Sort by product number" 
                className={clsx(styles.column, styles.bold, styles.catalogCol3)}
                onClick={() => {handleSort("productNumber", "name"); }}
            >
                Number&#x25BE;
            </button>
            <button
                aria-label="Sort by color" 
                className={clsx(styles.column, styles.bold, styles.catalogCol4)}
                onClick={() => {handleSort("color", "name"); }}
            >
                Color&#x25BE;
            </button>
            <button
                aria-label="Sort by list price" 
                className={clsx(styles.column, styles.bold, styles.catalogCol5)}
                onClick={() => {handleSort("listPrice", ""); }}
            >
                List Price&#x25BE;
            </button>
            <p className={clsx(styles.column, styles.bold, styles.catalogCol6)}>
                Options
            </p>
        </div>

    )
}

export default CatalogHeader