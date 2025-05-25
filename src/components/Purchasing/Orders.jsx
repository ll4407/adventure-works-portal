import PurchasingOrderTile from './PurchasingOrderTile';
import styles from '../../container/Purchasing/Purchasing.module.css';
import PageContext from '../../context/PageContext';

import axios from '../../api/axios';
import { motion } from 'motion/react';

import { useEffect, useState, useContext, useMemo } from "react";
import { toast } from 'react-toastify';
import { Outlet, useOutletContext } from 'react-router';
import Loading from '../utils/Loading';
import { colors } from '../../utilities';

import sortedArray from '../../container/SortBy/Sortby';

function Orders() {
     const { clicked } = useOutletContext();

    const [ordersDisplayed, setOrdersDisplayed] = useState(null);

    //Sorting 
    const [newArray, setNewArray] = useState(false);
    const [sortedBy, setSortedBy] = useState("");
    const [sortDirection, setSortDirection] = useState(false);
    //

    const { filter } = useContext(PageContext)

    useEffect(() => {
        axios.get(`Purchase`)
            .then(resp => {
                setOrdersDisplayed(resp.data)
            })
            .catch(err => {
                toast.error(err);
        });
    }, []);

    //Sorting
    useEffect(() => {
        setSortDirection(false); //Keeps track of current sort direction: ASC/DESC
    }, [sortedBy]);

    useEffect(() => {
        //force rerender when User activates sort method
    }, [newArray, sortedBy]);
    //

    let filteredOrders = useMemo(() =>{
        if(!ordersDisplayed) return []
        if(!filter) return ordersDisplayed

        const lowered = filter.toLowerCase()
        return ordersDisplayed.filter(o =>
            o.vendorName?.toLowerCase().includes(lowered) ||
            o.productName?.toLowerCase().includes(lowered) ||
            o.totalDue?.toString().toLowerCase().includes(lowered)
        )
    }, [filter, ordersDisplayed])


    const currentData = ordersDisplayed === null ? <Loading color={colors.green} /> :
        <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}>
            <div className={styles.OrderGridHeader}>
                <p onClick={() => {setSortedBy("productName");
                    filteredOrders = sortedArray(filteredOrders, "productName", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Product Name</p>

                <p onClick={() => {setSortedBy("vendorName");
                    filteredOrders = sortedArray(filteredOrders, "vendorName", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Vendor Name</p>

                <p onClick={() => {setSortedBy("orderDate");
                    filteredOrders = sortedArray(filteredOrders, "orderDate", "date", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Order Date</p>

                <p onClick={() => {setSortedBy("quantity");
                    filteredOrders = sortedArray(filteredOrders, "quantity", "", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Order Qty</p>

                <p onClick={() => {setSortedBy("totalDue");
                    filteredOrders = sortedArray(filteredOrders, "totalDue", "", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Total Due</p>

                <p onClick={() => {setSortedBy("producshipDatetName");
                    filteredOrders = sortedArray(filteredOrders, "shipDate", "date", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Ship Date</p>
            </div>

            {filteredOrders.map(ordersList => {
            return(
                <PurchasingOrderTile 
                key={ordersList.purchaseOrderDetailId}
                productId={ordersList.purchaseOrderDetailId}
                productName={ordersList.productName}
                storeName={ordersList.vendorName}
                orderDate={new Date(ordersList.orderDate).toLocaleDateString()}
                orderQuantity={ordersList.quantity}   
                totalDue={ordersList.totalDue}
                shipDate={new Date(ordersList.shipDate).toLocaleDateString()}
                clicked={clicked}
                />)
            })}
            <Outlet context={{clicked: clicked}} />
        </motion.section>;

    return (
        <>
            {currentData}
        </>
    )

}


export default Orders;