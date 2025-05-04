import { Edit, Delete } from '../../icons';
import styles from '../../container/Purchasing/Purchasing.module.css';
import { Link } from 'react-router-dom';

const PurchasingVendorTile = props => {
    return (
        <section className={styles.VendorGridContent}>
            <p>{props.vendorName}</p>
            <p>{props.phone}</p>
            <p>{props.businessId}</p>
            <p>{props.primaryContact}</p>
            <p>{props.email}</p>
            <div>
                <p>{props.addressLine}</p>
                <p>{props.addressLine2}</p>
                <p>{props.city}, {props.state}</p>
                <p>{props.postal}</p>
            </div>
            <p><Link to={'/purchasing/' + props.businessId}><Edit /></Link> <Delete /></p>
        </section>
    )
}

export default PurchasingVendorTile;