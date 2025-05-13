import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Inventory from "./Inventory";
import Catalog from "./Catalog";
import Loading from "../../components/utils/Loading";
import PageContext from "../../context/PageContext";

import { useState, useEffect } from "react";
import axios from '../../api/axios'
import { toast } from "react-toastify";

import styles from './Products.module.css'
import usePageContext from "../../hooks/usePageContext";

export default function Products(){
<<<<<<< HEAD:src/container/Products/Products.jsx
    const [activePage, setActivePage] = useState('Inventory')
    const [filter, setFilter] = useState("")
=======
    const pageContext = usePageContext("Inventory")
>>>>>>> main:src/container/Product/Products.jsx
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {filter, activePage} = pageContext

    useEffect(() =>{
        axios.get('/Inventory')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(() =>{
                setLoading(false)
            })
    }, [])

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

    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Products"}
                color={"blue"}
                firstButton={'Inventory'}
                secondButton={'Catalog'}
                />
            <div className={styles.contentWrapper}>
                {loading && <Loading />}
                {activePage === "Inventory" ?  
                    <Inventory products={filteredProducts}  /> : 
                    <Catalog products={filteredProducts} />}
            </div>
        </PageContext.Provider>

    )
}