import styles from './ProductModal.module.css'

const ProductModal = (props) => {
    const {product, setActiveProduct} = props
    return (
        <div className={styles.modalContainer} onClick={() => setActiveProduct(null)}>
            <h1>{product.productName}</h1>
        </div>
    )
}

export default ProductModal