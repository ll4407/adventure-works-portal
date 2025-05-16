import { useContext, useEffect, useMemo, useState } from 'react'
import PageContext from '../../context/PageContext'
import { Outlet } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import CatalogHeader from './Catalog/CatalogHeader'
import CatalogRow from './Catalog/CatalogRow'

import styles from '../../container/Products/Products.module.css'

const Catalog = () =>{

    const {filter} = useContext(PageContext)

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const filteredProducts = useMemo(() =>{
        if(!products) return []
        if(!filter) return products

        const lowered = filter.toLowerCase()
        return products.filter(p =>
            p.name?.toLowerCase().includes(lowered) ||
            p.color?.toLowerCase().includes(lowered) ||
            p.productNumber?.toLowerCase().includes(lowered)
        )
    }, [filter, products])

    useEffect(() =>{
        axios.get('/Product')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(() => setLoading(false))
    }, [refresh])

    if(loading) return null

    return(
        <>
            <div className={styles.productList}>
                <CatalogHeader />
                {filteredProducts.map(prod => (
                    <CatalogRow key={prod.productId} prod={prod} />
                ))}
            </div>
            <Outlet context={{refresh:refresh, setRefresh:setRefresh}} />
        </>
    )
}

export default Catalog