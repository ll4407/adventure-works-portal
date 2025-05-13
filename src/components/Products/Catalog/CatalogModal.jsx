import { useCallback, useEffect, useState } from 'react'
import styles from '../ProductModal.module.css'
import { ChevronDown, Close, Minus, Plus } from '../../../icons'
import axios from '../../../api/axios'
import { toast } from 'react-toastify'
import DetailsRow from '../DetailsRow'
import { unstable_batchedUpdates } from 'react-dom'



const CategoryModal = (props) => {
    const {productId, setActiveProduct} = props
    const [productDetails, setProductDetails] = useState(null)
    // const [editing, setEditing] = useState(false)
    const [updatableName, setUpdatableName] = useState('')
    const [updatableNumber, setUpdatableNumber] = useState('')
    const [updatableColor, setUpdatableColor] = useState('')
    const [updatableListPrice, setUpdatableListPrice] = useState(0)
    const removeActiveProduct = useCallback(() => {
        setActiveProduct(null)
    }, [setActiveProduct])

    useEffect(()=>{
        unstable_batchedUpdates(()=>{
            setUpdatableName(productDetails.productName)
            setUpdatableNumber(productDetails.productNumber)
            setUpdatableColor(productDetails.color)
            setUpdatableListPrice(productDetails.listPrice)
        })
    }, [productDetails])

    useEffect(() =>{
        axios.get(`/Product/${productId}`)
            .then(res => setProductDetails(res.data))
            .catch(err => toast.error(err.toString()))

    }, [])

    const ProductForm = () =>{
        <form>
            <input 
                value={updatableName} 
                onChange={(evt)=> setUpdatableName(evt.target.value)} />
            <input 
                value={updatableNumber} 
                onChange={(evt)=> setUpdatableNumber(evt.target.value)} />
            <input 
                value={updatableColor} 
                onChange={(evt)=> setUpdatableColor(evt.target.value)} />
            <input 
                value={updatableListPrice} 
                onChange={(evt)=> setUpdatableListPrice(evt.target.value)} />
        </form>
    }

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button aria-label='Close Modal. Go back to list' className={styles.backBtn} onClick={removeActiveProduct}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
                </button>
                <div className={styles.modalHeader}>
                    {productDetails.photoFileName &&<img src={productDetails.photoFileName} alt={productDetails.productName}/>}
                    <h1 className={styles.h1}>{productDetails.productName}</h1>
                    <div className={styles.locationContainer}>
                        {/* <p>Location</p>
                        <p>Shelf {product.shelf}</p>
                        <p>Bin {product.bin}</p> */}
                    </div>
                </div>
                <div className={styles.detailsParent}>
                    <div className={styles.detailsSection}>
                        <h2>Product Details</h2>
                        {/* <DetailsRow label='Product Name' value={product.productName} />
                        <DetailsRow label='Product Id' value={product.productId} />
                        <DetailsRow label='Product Number' value={product.productNumber} />
                        <DetailsRow label='Safety Stock Level' value={product.safetyStockLevel} />
                        <DetailsRow label='Reorder Point' value={product.reorderPoint} /> */}
                    </div>
                    <div className={styles.detailsSection}>
                        <h2>Location Details</h2>
                        {/* <DetailsRow label='Location' value={product.locationName} />
                        <DetailsRow label='Location ID' value={product.locationId} />
                        <DetailsRow label='Shelf' value={product.shelf} />
                        <DetailsRow label='Bin' value={product.bin} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal