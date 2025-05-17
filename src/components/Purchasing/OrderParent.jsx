import PurchasingOrderTile from './PurchasingOrderTile';
import styles from '../../container/Purchasing/Purchasing.module.css';

function OrderParent(props) {
    const { ordersDisplayed, clicked } = props;

    return (
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
                clicked={clicked}
            />)
            })
        }
        </section>
    )

}


export default OrderParent;