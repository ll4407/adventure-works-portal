import { useContext, useEffect, useMemo, useState } from 'react'
import PageContext from '../../context/PageContext'
import { Outlet, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'

import CatalogHeader from './Catalog/CatalogHeader'
import CatalogRow from './Catalog/CatalogRow'

import styles from './ProductSubpage.module.css'
import Loading from '../utils/Loading'
import { colors } from '../../utilities'
import clsx from 'clsx'

const Catalog = () =>{

    const {filter} = useContext(PageContext)

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const {id} = useParams()
    const modalIsOpen = Boolean(id)

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

    if(loading) return <Loading color={colors.blue} />

    return(
        <>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .5 }} 
                className={clsx(styles.productList,
                modalIsOpen && styles.ModalIsOpen,
            )}>
                <CatalogHeader />
                {filteredProducts.map(prod => (
                    <CatalogRow key={prod.productId} prod={prod} />
                ))}
            </motion.div>
            <Outlet context={{refresh:refresh, setRefresh:setRefresh}} />
        </>
    )
}

export default Catalog