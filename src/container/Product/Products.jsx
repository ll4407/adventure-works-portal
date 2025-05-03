import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useState, useEffect } from "react";
import Inventory from "./Inventory";
import axios from '../../api/axios'
import { toast } from "react-toastify";
import Catalog from "./Catalog";
import PageContext from "../../context/PageContext";

export default function Product(){
    const [activePage, setActivePage] = useState('Inventory')
    const [filter, setFilter] = useState("")
    const [products, setProducts] = useState(null)

    useEffect(() =>{
        axios.get('/Inventory')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
    }, [])

    const context = {
        activePage:activePage,
        setActivePage: setActivePage,
        filter: filter,
        setFilter:setFilter
    }

    return(

        <PageContext.Provider value={context}>
            <SectionHeader
                title={"Products"}
                color={"blue"}
                firstButton={'Inventory'}
                secondButton={'Catalog'}
                />
            {activePage === "Inventory" ?  <Inventory products={products} /> : <Catalog products={products}/>}

        </PageContext.Provider>

    )
}