import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import styles from './Products.module.css'
import usePageContext from "../../hooks/usePageContext";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function Products(){
    const pageContext = usePageContext({firstBtnUrl: '/products/inventory', secondBtnUrl: '/products/catalog'})
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