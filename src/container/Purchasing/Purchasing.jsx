import SectionHeader from "../../components/SectionHeader/SectionHeader";
import VendorParent from "../../components/Purchasing/VendorParent";
import OrderParent from "../../components/Purchasing/OrderParent";
import PageContext from "../../context/PageContext";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from "react";
import { Outlet } from 'react-router-dom';

import { loadVendorsValuesAsync, loadOrdersValuesAsync } from '../../store/purchasing';
import usePageContext from "../../hooks/usePageContext";

import styles from './Purchasing.module.css';

function Purchasing(){
    const dispatch = useDispatch();

    const pageContext = usePageContext("Vendors")
    const {filter, activePage} = pageContext

    const [isActive, setIsActive] = useState(false);

    const [vendorsDisplayed, setVendorsDisplayed] = useState([]);
    const [ordersDisplayed, setOrdersDisplayed] = useState([]);
	const [vendorUpdateInfo, setVendorUpdateInfo] = useState(false);

	const { vendorsList, ordersList } = useSelector(state => state.purchase);

    //Intial Loading of data - doing both so that there is only a one time load when this page is launch
    useEffect(() => {
        dispatch(loadVendorsValuesAsync());
        dispatch(loadOrdersValuesAsync());
    }, [dispatch]);

    //sets intial version of list
    useEffect(() => {
        setVendorsDisplayed(vendorsList);       
        setOrdersDisplayed(ordersList);       
        
    }, []);

    //filters the list on change
    useEffect(() =>{
        if(activePage === 'Vendors'){
            setVendorsDisplayed(vendorsList.filter(elt => filter === "" || 
                elt.vendorName.toLowerCase().includes(filter.toLowerCase()) ||
                elt.contactFirstName.toLowerCase().includes(filter.toLowerCase()) ||
                elt.contactLastName.toLowerCase().includes(filter.toLowerCase()) ||
                elt.businessEntityId.toString().includes(filter.toLowerCase()))
            );
        }
        else{
            setOrdersDisplayed(ordersList.filter(elt => filter === "" || 
                elt.productName.toLowerCase().includes(filter.toLowerCase()) ||
                elt.vendorName.toLowerCase().includes(filter.toLowerCase()) ||
                elt.businessEntityId.toString().includes(filter.toLowerCase()))
            );
        }
    }, [vendorsList, ordersList, filter])

    function UpdateEveryVendor() {
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }
    const handleMemberSelected = useCallback(() => {
		setIsActive(x => !x)
	}, []);

    //layouts based on buttons
    const listValuesVendors = <VendorParent 
                                vendorsDisplayed={vendorsDisplayed} 
                                clicked={handleMemberSelected}
                                vendorListUpdate={UpdateEveryVendor}
                              />;

    const listValuesOrders = <OrderParent 
                                ordersDisplayed={ordersDisplayed} 
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