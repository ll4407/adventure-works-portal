import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";

import SectionHeader from "../../components/SectionHeader/SectionHeader";

import styles from './Products.module.css'

export default function Products(){
    const pageContext = usePageContext({
        firstBtnUrl: '/products/inventory', 
        secondBtnUrl: '/products/catalog'
    })
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() =>{
        if(pathname === '/products'){
            navigate('/products/inventory')
        }
    }, [])

    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Products"}
                color={"blue"}
                firstButton={'Inventory'}
                secondButton={'Catalog'}
                />
            <div className={styles.contentWrapper}>
                <Outlet />
            </div>
        </PageContext.Provider>

    )

}