import { Edit, Delete, ChevronDown } from '../../icons';
import styles from '../../container/Purchasing/Purchasing.module.css';
import { Link } from 'react-router-dom';

const PurchasingVendorTile = props => {
    return (
        <section className={styles.VendorGridContent}>
            <div>
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
                <p><Link aria-label='Edit Button' to={'/purchasing/' + props.businessId}><Edit /></Link> <Delete /></p>
            </div>

            <div><Link aria-label='View More Button' to={'/purchasing/' + props.businessId}><ChevronDown size={36} /></Link></div>
        </section>
    )
}

export default PurchasingVendorTile;