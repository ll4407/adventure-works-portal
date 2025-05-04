import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PurchasingVendorTile from '../../components/Purchasing/PurchasingVendorTile';
import PurchasingOrderTile from '../../components/Purchasing/PurchasingOrderTile';
import PageContext from "../../context/PageContext";

import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from "react";

import { loadVendorsValuesAsync, loadOrdersValuesAsync } from '../../store/purchasing';

import styles from './Purchasing.module.css';


function Purchasing(){
    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState('Vendors')
    const [filter, setFilter] = useState("")


	const { vendorsList, ordersList } = useSelector(state => state.purchase);

    const [tabSelected, setTabSelected] = useState(0);


    //Intial Loading of data - doing both so that there is only a one time load when this page is launch
    useEffect(() => {
        dispatch(loadVendorsValuesAsync());
        dispatch(loadOrdersValuesAsync());
    }, []);


    //Handles button click
    const handleActiveTab = useCallback((value) => {
        setTabSelected(value);
    }); 


    //layouts based on buttons
    const listValuesVendors = 
    <section>
            <div className={styles.VendorGridHeader}>
                <p>Vendor Name</p>
                <p>Phone</p>
                <p>Business ID</p>
                <p>Primary Contact</p>
                <p>Email</p>
                <p>Address</p>
                <p>Options</p>
            </div>

            {vendorsList.map(vendorsList => {
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
            {ordersList.map(ordersList => {
            return(
                <PurchasingOrderTile 
                key={ordersList.id}
                productId={ordersList.id}
                productName={ordersList.productName}
                storeName={ordersList.storeName}
                orderDate={ordersList.orderDate}
                orderQuantity={ordersList.orderQty}   
                totalDue={ordersList.lineTotal}
                shipDate={ordersList.shipDate}
            />)
            })
        }
        </section>
        ;


    const context = {
        activePage:activePage,
        setActivePage: setActivePage,
        filter: filter,
        setFilter:setFilter
    }


    //Layout
    return(
        <PageContext.Provider value={context}>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}
                />
            <section className={styles.purchaseLayout}>
                {activePage === "Vendors" ?  
                    listValuesVendors: listValuesOrders}
            </section>
        </PageContext.Provider>

    )
}

export default Purchasing;