import clsx from 'clsx'
import { ChevronDown, Delete, Edit } from '../../icons'
import styles from '../../container/Products/Products.module.css'
import { useContext, useEffect, useState, useMemo } from 'react'
import PageContext from '../../context/PageContext'
import axios from '../../api/axios'
import { toast } from 'react-toastify'
import InventoryModal from './InventoryModal'

const Inventory = () =>{

    const {setShowSearch, filter} = useContext(PageContext)
    const [activeProduct, setActiveProduct] = useState(null)
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const filteredProducts = useMemo(() =>{
        if(!products) return []
        if(!filter) return products

        const lowered = filter.toLowerCase()
        return products.filter(p =>
            p.productName.toLowerCase().includes(lowered) ||
            p.locationName.toLowerCase().includes(lowered) ||
            p.shelf.toLowerCase().includes(lowered)
        )
    }, [filter, products])

    //fetch
    useEffect(() =>{
        axios.get('/Inventory')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(() => setLoading(false))
    }, [])
    
    //modal clean up
    useEffect(() => {
        if (!loading) {
            setShowSearch(prev => {
                const desired = !activeProduct;
                return prev === desired ? prev : desired;
            });
        }
    }, [activeProduct, setShowSearch, loading])

    if(loading) return null

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
            <InventoryModal 
                product={activeProduct} 
                setActiveProduct={setActiveProduct} 
                />}
        </>
    )
}

export default Inventory