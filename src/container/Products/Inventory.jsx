import clsx from 'clsx'
import { ChevronDown, Delete, Edit } from '../../icons'
import ProductModal from './ProductModal'
import styles from './Products.module.css'
import { useContext, useEffect, useState } from 'react'
import PageContext from '../../context/PageContext'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

const Inventory = () =>{

    const {setShowSearch, filter} = useContext(PageContext)
    const [activeProduct, setActiveProduct] = useState(null)
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    //fetch
    useEffect(() =>{
        axios.get('/Inventory')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(setLoading(false))
    }, [])

    //filter
    useEffect(()=>{
        let timer;
        if(filter){
            timer = setTimeout(() =>{
                const loweredFilter = filter.toLowerCase()
                const newFilteredProducts = products.filter(prod =>
                    prod.productName.toLowerCase().includes(loweredFilter) ||
                    prod.locationName.toLowerCase().includes(loweredFilter) ||
                    prod.shelf.toLowerCase().includes(loweredFilter)
                )
                setFilteredProducts(newFilteredProducts)
            }, 500)
        }else{
            if(products?.length){
                setFilteredProducts(products)
            }
        }

        return () => clearTimeout(timer)

    },[filter, products])
    
    //modal clean up
    useEffect(() => {
        if(activeProduct){
            setShowSearch(false)
        }else{
            setShowSearch(true)
        }
    }, [activeProduct, setShowSearch])

    if(loading || !filteredProducts.length){
        return <></>
    }

    return(
        <>
        <div className={styles.productList}>
            <div className={clsx(styles.productCard, styles.tableHeader)}>
                <p className={clsx(styles.column, styles.bold, styles.col1)}>
                    Product Name
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col2)}>
                    Qty
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col3)}>
                    Product ID
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col4)}>
                    Location
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col5)}>
                    Shelf
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col6)}>
                    Bin
                </p>
                <p className={clsx(styles.column, styles.bold, styles.col7)}>
                    Options
                </p>
            </div>
            {filteredProducts.map(prod => (
                <button key={prod.productId + prod.productName + prod.locationId + prod.locationName} className={styles.productCard} onClick={() => setActiveProduct(prod)}>
                    <div className={clsx(styles.column, styles.col1)}>
                        <p className={styles.productName}>{prod.productName}</p>
                        <p className={styles.extraLocation}>{prod.locationName}</p>
                    </div>
                    <p className={clsx(styles.column, styles.col2)}><span className={styles.quantitySpan}>QTY </span>{prod.quantity}</p>
                    <p className={clsx(styles.column, styles.col3)}>{prod.productId}</p>
                    <p className={clsx(styles.column, styles.col4)}>{prod.locationName}</p>
                    <p className={clsx(styles.column, styles.col5)}>{prod.shelf}</p>
                    <p className={clsx(styles.column, styles.col6)}>{prod.bin}</p>
                    <div className={clsx(styles.col7)}>
                        <Edit/>
                        <Delete />
                    </div>
                    <ChevronDown size={30} className={styles.chevron} />
                </button>
            ))}
        </div>
        {activeProduct && 
            <ProductModal 
                product={activeProduct} 
                setActiveProduct={setActiveProduct} 
                />}
        </>
    )
}

export default Inventory