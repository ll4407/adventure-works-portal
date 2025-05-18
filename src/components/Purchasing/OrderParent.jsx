import PurchasingOrderTile from './PurchasingOrderTile';
import styles from '../../container/Purchasing/Purchasing.module.css';
import PageContext from '../../context/PageContext';

import axios from '../../api/axios';

import { useEffect, useState, useContext, useMemo } from "react";
import { toast } from 'react-toastify';

function OrderParent(props) {
    const { clicked } = props;

    const [ordersDisplayed, setOrdersDisplayed] = useState(null);

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


    const currentData = ordersDisplayed === null ? <>Loading</> :
        <section>
            <div className={styles.OrderGridHeader}>
                <p>Product Name</p>
                <p>Vendor Name</p>
                <p>Order Date</p>
                <p>Order Qty</p>
                <p>Total Due</p>
                <p>Ship Date</p>
            </div>

            
            {filteredOrders.map(ordersList => {
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
                clicked={clicked}
                />)
            })}
        </section>;

    return (
        <>
            {currentData}
        </>
    )

}


export default OrderParent;