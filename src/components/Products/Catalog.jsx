import CatalogModal from './Catalog/CatalogModal'
import CatalogRow from './Catalog/CatalogRow'
import styles from '../../container/Products/Products.module.css'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import PageContext from '../../context/PageContext'
import axios from '../../api/axios'
import { toast } from 'react-toastify'
import CatalogHeader from './Catalog/CatalogHeader'

const Catalog = () =>{

    const {setShowSearch, filter} = useContext(PageContext)
    const [activeProduct, setActiveProduct] = useState(null)
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const filteredProducts = useMemo(() =>{
        if(!products) return []
        if(!filter) return products

        const lowered = filter.toLowerCase()
        return products.filter(p =>
            p.name.toLowerCase().includes(lowered) ||
            p.color.toLowerCase().includes(lowered)
        )
    }, [filter, products])

    //fetch
    useEffect(() =>{
        axios.get('/Product')
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
    }, [activeProduct, setShowSearch, loading]);

    if(loading) return null

    return(
        <>
        <div className={styles.productList}>
            <CatalogHeader />
            {filteredProducts.map(prod => (
                <CatalogRow key={prod.productId} prod={prod} onClick={setActiveProduct} />
            ))}
        </div>
        {activeProduct && 
            <CatalogModal 
                productId={activeProduct.productId} 
                setActiveProduct={setActiveProduct} 
                />}
        </>
    )
}

export default Catalog