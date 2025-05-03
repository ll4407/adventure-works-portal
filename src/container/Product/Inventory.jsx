import { ChevronDown } from '../../icons'
import styles from './Products.module.css'
import { useState } from 'react'
// const fakeProduct = {
//     bin: 1,
//     locationId: 1,
//     locationName: "",
//     productId:1,
//     productName:'',
//     productNumber: "",
//     quantity:1,
//     reorderPoint: 1,
//     safetyStockLevel: 1,
//     shelf: ""
// }

const Inventory = (props) =>{

        const [activeProduct, setActiveProduct] = useState(null)

    const {products} = props

    return(
        <>
        <div className={styles.productList}>
            {products.map(prod => (
                <button className={styles.productCard} onClick={() => setActiveProduct(prod)}>
                    <div className={styles.column}>
                        <p className={styles.productName}>{prod.productName}</p>
                        <p>{prod.locationName}</p>
                    </div>
                    <p>QTY {prod.quantity}</p>
                    <ChevronDown size={30} className={styles.chevron} />
                </button>
            ))}
        </div>
        {activeProduct && 
            <ProductModal 
                product={activeProduct} 
                setActiveProduct={setActiveProduct} />}
        </>
    )
}

export default Inventory