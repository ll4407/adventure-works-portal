import SectionHeader from "../../components/SectionHeader/SectionHeader";
import VendorParent from "../../components/Purchasing/VendorParent";
import OrderParent from "../../components/Purchasing/OrderParent";
import PageContext from "../../context/PageContext";

import { useEffect, useState, useCallback } from "react";
import { Outlet } from 'react-router-dom';

import usePageContext from "../../hooks/usePageContext";

import styles from './Purchasing.module.css';

function Purchasing(){
    const pageContext = usePageContext("Vendors")
    const {filter, activePage} = pageContext
 
    const [isActive, setIsActive] = useState(false);
	const [vendorUpdateInfo, setVendorUpdateInfo] = useState(false);

    function UpdateEveryVendor() {
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }
    const handleMemberSelected = useCallback(() => {
		setIsActive(x => !x)
	}, []);

    //layouts based on buttons
    const listValuesVendors = <VendorParent 
                                clicked={handleMemberSelected}
                                vendorListUpdate={UpdateEveryVendor}
                              />;

    const listValuesOrders = <OrderParent 
                                clicked={handleMemberSelected}
                              />;

    //Layout
    return(
        <PageContext.Provider value={pageContext}>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}
                />
            <section className={`${styles.purchaseLayout} ${isActive ? styles.hidden : ''}`}>
                {activePage === "Vendors" ?  
                    listValuesVendors: listValuesOrders}
            </section>
            <section>
				<Outlet context={{clicked: handleMemberSelected}}/>
			</section>
        </PageContext.Provider>

    )
}

export default Purchasing;