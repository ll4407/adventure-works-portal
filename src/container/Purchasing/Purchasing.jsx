import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PurchasingVendorTile from '../../components/Purchasing/PurchasingVendorTile';
import PurchasingOrderTile from '../../components/Purchasing/PurchasingOrderTile';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from "react";

import { loadVendorsValuesAsync, loadOrdersValuesAsync } from '../../store/purchasing';

import styles from './Purchasing.module.css';


function Purchasing(){
    const dispatch = useDispatch();
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
    const listValuesVendors = (
            <table>
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Phone</th>
                        <th>Business ID</th>
                        <th>Primary Contact</th>
                        <th>Email</th>
                        <th>Billing Address</th>
                        <th>Options</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vendorsList.map(vendorsList => {
                        return (
                            <PurchasingVendorTile 
                                key={vendorsList.businessEntityId}
                                vendorName={vendorsList.vendorName}
                                phone={vendorsList.contactPhone}
                                businessId={vendorsList.businessEntityId}   
                                primaryContact={vendorsList.contactFirstName + ' ' + vendorsList.contactLastName}
                                email={vendorsList.contactEmail}
                                billingAddress={vendorsList.addressLine1}
                            />
                        )}
                    )}
                </tbody>
        </table>
    );

    const listValuesOrders = (
            <table key={ordersList.id}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Vendor Name</th>
                        <th>Order Date</th>
                        <th>Order Qty</th>
                        <th>Total Due</th>
                        <th>Ship Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersList.map(ordersList => {
                        return (
                            <PurchasingOrderTile 
                                key={ordersList.id}
                                productName={ordersList.productName}
                                storeName={ordersList.storeName}
                                orderDate={ordersList.orderDate}
                                orderQuantity={ordersList.orderQty}   
                                totalDue={ordersList.lineTotal}
                                shipDate={ordersList.shipDate}
                            />
                        )
                    })}
                </tbody>
            </table>
    );

    //Determines selected layout
    const selectedLayout = tabSelected === 0 ? listValuesVendors : listValuesOrders;

    //Layout
    return(
        <>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}
                onChange={handleActiveTab} />
            <section className={styles.purchaseTable}>
                {selectedLayout}
            </section>
        </>

    )
}

export default Purchasing;