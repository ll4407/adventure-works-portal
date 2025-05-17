import { Outlet } from "react-router";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";

import SectionHeader from "../../components/SectionHeader/SectionHeader";

import styles from './Employees.module.css'
import { Overview } from "../../components";

export default function Employees(){
    const pageContext = usePageContext({
        firstBtnUrl: '/employees', 
    })


    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Employees"}
                color={"orange"}
                firstButton={'Overview'}
                />
            <div className={styles.contentWrapper}>
                <Overview />
            </div>
        </PageContext.Provider>

    )

}