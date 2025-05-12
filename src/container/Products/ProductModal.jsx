// import { useEffect } from 'react'
import { useCallback, useEffect, useState } from 'react'
import styles from './ProductModal.module.css'
import { ChevronDown, Close, Minus, Plus } from '../../icons'
import axios from '../../api/axios'
import { toast } from 'react-toastify'
import DetailsRow from './DetailsRow'


const ProductModal = (props) => {
    const {product, setActiveProduct} = props
    const [quantity, setQuantity] = useState(product.quantity)
    const removeActiveProduct = useCallback(() => {
        setActiveProduct(null)
    }, [setActiveProduct])


    useEffect(() => {

        const timer = setTimeout(() => {
            // this check stops this from running on the first render 
            if(quantity != product.quantity){
                axios.put(`/Inventory/${product.productId}/${product.locationId}`, {
                    productId: product.productId,
                    locationId: product.locationId,
                    quantity: quantity
                }).then(res => {
                    if(200 >= res.status < 300){
                        toast.success(`${product.productName} quantity updated`)
                    }
                }).catch(err => toast.error(err.message))
            }

        }, 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [quantity, product])

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button aria-label='Close Modal. Go back to list' className={styles.backBtn} onClick={removeActiveProduct}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
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
                <div className={styles.detailsParent}>
                    <div className={styles.detailsSection}>
                        <h2>Product Details</h2>
                        <DetailsRow label='Product Name' value={product.productName} />
                        <DetailsRow label='Product Id' value={product.productId} />
                        <DetailsRow label='Product Number' value={product.productNumber} />
                        <DetailsRow label='Safety Stock Level' value={product.safetyStockLevel} />
                        <DetailsRow label='Reorder Point' value={product.reorderPoint} />
                    </div>
                    <div className={styles.detailsSection}>
                        <h2>Location Details</h2>
                        <DetailsRow label='Location' value={product.locationName} />
                        <DetailsRow label='Location ID' value={product.locationId} />
                        <DetailsRow label='Shelf' value={product.shelf} />
                        <DetailsRow label='Bin' value={product.bin} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal