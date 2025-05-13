import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { Inventory, Catalog } from "../../components/Products";
import PageContext from "../../context/PageContext";

import styles from './Products.module.css'
import usePageContext from "../../hooks/usePageContext";

export default function Products(){

    const pageContext = usePageContext("Inventory")

    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Products"}
                color={"blue"}
                firstButton={'Inventory'}
                secondButton={'Catalog'}
                />
            <div className={styles.contentWrapper}>
                {pageContext.activePage === "Inventory" ?  
                    <Inventory  /> : 
                    <Catalog />}
            </div>
        </PageContext.Provider>

    )
}