import { useContext, useEffect, useState, useMemo } from 'react'
import PageContext from '../../context/PageContext'
import { Outlet, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import InventoryHeader from './Inventory/InventoryHeader'
import InventoryRow from './Inventory/InventoryRow'
import Loading from '../utils/Loading'

import { colors } from '../../utilities'
import styles from './ProductSubpage.module.css'
import clsx from 'clsx'

import sortedArray from '../../container/SortBy/Sortby';

const Inventory = () => {
    const [activeProduct, setActiveProduct] = useState(null)
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)

    const{ productId } = useParams()

    const modalIsOpen = Boolean(productId)

    const { setShowSearch, filter } = useContext(PageContext)

    //Sorting 
        const [newArray, setNewArray] = useState(false);
        const [sortedBy, setSortedBy] = useState("");
        const [sortDirection, setSortDirection] = useState(false);

    useEffect(() => {
            setSortDirection(false);
        }, [sortedBy]);
    
    useEffect(() => {

    }, [newArray, sortedBy]);
    
    //

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

    //sorting
    const handleSortChange = (name, dataType) => {
        sortedArray(filteredProducts, name, dataType, sortDirection);

        setSortedBy(name);
        setSortDirection(x => !x);
        setNewArray(x => !x);
    }

    useEffect(() =>{
        axios.get('/Inventory')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(() => setLoading(false))
    }, [refresh])
    
    //modal clean up
    useEffect(() => {
        if (!loading) {
            setShowSearch(prev => {
                const desired = !activeProduct;
                return prev === desired ? prev : desired;
            });
        }
    }, [activeProduct, setShowSearch, loading])

    if(loading) return <Loading color={colors.blue} />
    if(loading || !products) return null

    return(
        <>
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}
            className={clsx(styles.productList,
            modalIsOpen && styles.ModalIsOpen,
        )}>
            <InventoryHeader handleSort={handleSortChange} />
            {filteredProducts.map((prod, idx) => (
                <InventoryRow 
                    // there are duplicate keys unless I do this idx*100.
                    key={prod.productId + prod.locationId + idx*100}
                    prod={prod} 
                    setActiveProduct={setActiveProduct}/>
            ))}
        </motion.div>
        <Outlet 
            context={{
                product: activeProduct, 
                setActiveProduct:setActiveProduct,
                allProducts: products,
                setRefresh: setRefresh,
                }} />
        </>
    )
}

export default Inventory