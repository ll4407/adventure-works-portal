import { Edit, Delete } from '../../icons';

const PurchasingVendorTile = props => {
    return (
        <section>
            <p>{props.vendorName}</p>
            <p>{props.phone}</p>
            <p>{props.businessId}</p>
            <p>{props.primaryContact}</p>
            <p>{props.email}</p>
            <p>{props.billingAddress}</p>
            <p><Edit /> <Delete /></p>
        </section>
    )
}

export default PurchasingVendorTile;