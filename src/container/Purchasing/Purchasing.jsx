import SectionHeader from "../../components/SectionHeader/SectionHeader";
import VendorParent from "../../components/Purchasing/VendorParent";
import OrderParent from "../../components/Purchasing/OrderParent";
import PageContext from "../../context/PageContext";

import { useState, useCallback } from "react";
import { Outlet } from 'react-router-dom';

import usePageContext from "../../hooks/usePageContext";

import styles from './Purchasing.module.css';

function Purchasing(){
    const pageContext = usePageContext("Vendors")
    const {activePage} = pageContext
 
    const [isActive, setIsActive] = useState(false);
	const [vendorUpdateInfo, setVendorUpdateInfo] = useState(false);

    const handleMemberSelected = useCallback(() => {
		setIsActive(x => !x)
	}, []);
    
    function UpdateEveryVendor() {
        console.log("Rawr")
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }

    //layouts based on buttons
    const listValuesVendors = <VendorParent vendorUpdateInfo={vendorUpdateInfo}
                                clicked={handleMemberSelected}
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
				<Outlet context={{clicked: handleMemberSelected, vendorUpdateMethod: UpdateEveryVendor }}/>
			</section>
        </PageContext.Provider>

    )
}

export default Purchasing;