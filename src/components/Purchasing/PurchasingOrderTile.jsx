import { ChevronDown } from '../../icons';
import styles from '../../container/Purchasing/Purchasing.module.css';
import { Link } from 'react-router-dom';

const PurchasingOrderTile = props => {    
    return (
        <section className={styles.OrderGridContent}>
            <p>{props.productName}</p>
            <p>{props.storeName}</p>
            <p>{props.orderDate}</p>
            <p>{props.orderQuantity}</p>
            <p>${props.totalDue}</p>
            <p>{props.shipDate}</p>
            <p><Link to={'/purchasing/' + props.productId}><ChevronDown size={36} /></Link></p>
        </section>
    )
}

export default PurchasingOrderTile;