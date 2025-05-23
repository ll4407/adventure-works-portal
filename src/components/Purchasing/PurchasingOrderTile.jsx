import { ChevronDown } from '../../icons';
import styles from '../../container/Purchasing/Purchasing.module.css';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router';

const PurchasingOrderTile = props => {    
    const { clicked } = useOutletContext();

    return (
        <section className={styles.OrderGridContent}>
            <div>
                <p>{props.productName}</p>
                <p>{props.storeName}</p>
                <p>{props.orderDate}</p>
                <p>{props.orderQuantity}</p>
                <p>${props.totalDue.toFixed(2)}</p>
                <p>{props.shipDate}</p>
                <Link
                    aria-label='navigate to order details page' 
                    onClick={clicked} 
                    to={`/purchasing/orders/${props.productId}`}>
                    <ChevronDown size={36} />
                </Link>
            </div>

            <div>
                <Link
                    aria-label='navigate to order details page' 
                    onClick={clicked} 
                    to={`/purchasing/orders/${props.productId}`}>
                    <ChevronDown size={36} />
                </Link>
            </div>
        </section>
    )
}

export default PurchasingOrderTile;