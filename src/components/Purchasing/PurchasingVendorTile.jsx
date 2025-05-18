import { Edit, Delete, ChevronDown } from '../../icons';
import styles from '../../container/Purchasing/Purchasing.module.css';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router';

const PurchasingVendorTile = props => {
    const { clicked } = useOutletContext();

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
               
                <div>
                    <Link 
                        onClick={clicked} 
                        aria-label='Edit Button' 
                        to={`/purchasing/vendors/${props.businessId}/${props.phone}`}>
                            <Edit />
                    </Link> 
                    <Delete />
                </div>
            </div>
            <div>
                <Link 
                    onClick={clicked}  
                    aria-label='View More Button' 
                    to={`/purchasing/vendors/${props.businessId}/${props.phone}`}>
                    <ChevronDown size={36} />
                </Link>
            </div>
        </section>
    )
}

export default PurchasingVendorTile;