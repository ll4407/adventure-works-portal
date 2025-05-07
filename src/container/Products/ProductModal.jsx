// import { useEffect } from 'react'
import { useCallback, useEffect, useState } from 'react'
import styles from './ProductModal.module.css'
import { ChevronDown, Minus, Plus } from '../../icons'

const ProductModal = (props) => {
    const {product, setActiveProduct} = props
    const [quantity, setQuantity] = useState(product.quantity)
    const removeActiveProduct = useCallback(() => {
        setActiveProduct(null)
    }, [setActiveProduct])


    useEffect(() => {

        const timer = setTimeout(() => {
            console.log('this is where you fire the update')
        }, 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [quantity])

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button className={styles.backBtn} onClick={removeActiveProduct}>
                    <ChevronDown className={styles.backBtnChevron} />
                    Back
                </button>
                <div className={styles.modalHeader}>
                    <h1 className={styles.h1}>{product.productName}</h1>
                    <div className={styles.locationContainer}>
                        <p>Location</p>
                        <p>Shelf {product.shelf}</p>
                        <p>Bin {product.bin}</p>
                    </div>
                    <div className={styles.quantityContainer}>
                        <p>Quantity</p>
                        <div className={styles.quantityControls}>
                            <button onClick={() => setQuantity(q => q-1)}>
                                <Minus />
                            </button>
                            <p>{quantity}</p>
                            <button onClick={() => setQuantity(q => q+1)}>
                                <Plus />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Product Details</h2>
                        <div className={styles.detailsRow}>
                            <p>Product Name</p>
                            <p>{product.productName}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Product ID</p>
                            <p>{product.productId}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Product Number</p>
                            <p>{product.productNumber}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Safety Stock Level</p>
                            <p>{product.safetyStockLevel}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Reorder Point</p>
                            <p>{product.reorderPoint}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Location Details</h2>
                        <div className={styles.detailsRow}>
                            <p>Location</p>
                            <p>{product.locationName}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Location ID</p>
                            <p>{product.locationId}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Shelf</p>
                            <p>{product.shelf}</p>
                        </div>
                        <div className={styles.detailsRow}>
                            <p>Bin</p>
                            <p>{product.bin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal