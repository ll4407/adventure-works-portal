import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PurchasingVendorTile from '../../components/Purchasing/PurchasingVendorTile';
import PurchasingOrderTile from '../../components/Purchasing/PurchasingOrderTile';
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
        console.log('Activate')
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }
    const handleMemberSelected = useCallback(() => {
		setIsActive(x => !x)
	}, []);

    //layouts based on buttons
    const listValuesVendors = 
    <section>
            <div className={styles.VendorGridHeader}>
                <p>Vendor Name</p>
                <p>Phone</p>
                <p>Business ID</p>
                <p>Primary Contact</p>
                <p>Email</p>
                <p>Billing Address</p>
                <p>Options</p>
            </div>

            {vendorsDisplayed.map(vendorsList => {
                return(
                    <PurchasingVendorTile 
                    key={vendorsList.businessEntityId}
                    vendorName={vendorsList.vendorName}
                    phone={vendorsList.contactPhone}
                    businessId={vendorsList.businessEntityId}   
                    primaryContact={vendorsList.contactFirstName + ' ' + vendorsList.contactLastName}
                    email={vendorsList.contactEmail}
                    addressLine={vendorsList.addressLine1}
                    addressLine2={vendorsList.addressLine2}
                    city={vendorsList.city}
                    state={vendorsList.stateProvinceName}
                    postal={vendorsList.postalCode}
                    clicked={handleMemberSelected}
                    vendorListUpdate={UpdateEveryVendor}
                />)
            })
        }   
        </section>
        ;

    const listValuesOrders = 
        <section>
            <div className={styles.OrderGridHeader}>
                <p>Product Name</p>
                <p>Vendor Name</p>
                <p>Order Date</p>
                <p>Order Qty</p>
                <p>Total Due</p>
                <p>Ship Date</p>
            </div>
            {ordersDisplayed.map(ordersList => {
            return(
                <PurchasingOrderTile 
                key={ordersList.purchaseOrderDetailId}
                productId={ordersList.purchaseOrderDetailId}
                productName={ordersList.productName}
                storeName={ordersList.vendorName}
                orderDate={ordersList.orderDate}
                orderQuantity={ordersList.quantity}   
                totalDue={ordersList.totalDue}
                shipDate={ordersList.shipDate}
                clicked={handleMemberSelected}
            />)
            })
        }
        </section>
        ;


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