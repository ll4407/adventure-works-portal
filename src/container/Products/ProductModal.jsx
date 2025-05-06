// import { useEffect } from 'react'
import styles from './ProductModal.module.css'
// import axios from '../../api/axios'

const ProductModal = (props) => {
    const {product, setActiveProduct} = props

    // useEffect(()=>{
    //     axios.get()
    // },[])
    return (
        <div className={styles.modalContainer} onClick={() => setActiveProduct(null)}>
            <div onClick={(evt) => evt.stopPropagation()}>
                <h1>{product.productName}</h1>
            </div>
        </div>
    )
}

export default ProductModal