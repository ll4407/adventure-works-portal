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

    const filteredOrders = useMemo(() =>{
        if(!ordersDisplayed) return []
        if(!filter) return ordersDisplayed

        const lowered = filter.toLowerCase()
        return ordersDisplayed.filter(o =>
            o.vendorName?.toLowerCase().includes(lowered) ||
            o.productName?.toLowerCase().includes(lowered) ||
            o.totalDue?.toString().toLowerCase().includes(lowered)
        )
    }, [filter, ordersDisplayed])

    //sorting function
    //activates sort function and sets filter list
    const handleSortChange = (name, dataType) => {
        let direction;

        if(sortedBy !== name){
            setSortedBy(name);

            direction = false;
        }
        else{
            setSortDirection(x => !x);

            direction = !sortDirection;
        }

        sortedArray(filteredOrders, name, dataType, direction);

        setNewArray(x => !x);
    }

    const currentData = ordersDisplayed === null ? <Loading color={colors.green} /> :
        <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}>
            <div className={styles.OrderGridHeader}>
                <p onClick={() => {handleSortChange("productName", "name");}}>Product Name &#x25BE;</p>

                <p onClick={() => {handleSortChange("vendorName", "name");}}>Vendor Name &#x25BE;</p>

                <p onClick={() => {handleSortChange("orderDate", "date");}}>Order Date &#x25BE;</p>

                <p onClick={() => {handleSortChange("quantity", "");}}>Order Qty &#x25BE;</p>

                <p onClick={() => {handleSortChange("totalDue", "");}}>Total Due &#x25BE;</p>

                <p onClick={() => {handleSortChange("shipDate", "date");}}>Ship Date &#x25BE;</p>
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