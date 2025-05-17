import PurchasingVendorTile from './PurchasingVendorTile';
import styles from '../../container/Purchasing/Purchasing.module.css';

function VendorParent(props) {
    const { vendorsDisplayed, clicked, vendorListUpdate } = props;

    return (
        <section>
            <div className={styles.VendorGridHeader}>
                <p>Vendor Name</p>
                <p>Phone</p>
                <p>Business ID</p>
                <p>Primary Contact</p>
                <p>Email</p>
                <p>Billing Address</p>
                <p>Options</p>
            </div>


            {vendorsDisplayed.map(vendorsList => {
                return(
                    <PurchasingVendorTile 
                    key={vendorsList.businessEntityId}
                    vendorName={vendorsList.vendorName}
                    phone={vendorsList.contactPhone}
                    businessId={vendorsList.businessEntityId}   
                    primaryContact={vendorsList.contactFirstName + ' ' + vendorsList.contactLastName}
                    email={vendorsList.contactEmail}
                    addressLine={vendorsList.addressLine1}
                    addressLine2={vendorsList.addressLine2}
                    city={vendorsList.city}
                    state={vendorsList.stateProvinceName}
                    postal={vendorsList.postalCode}
                    clicked={clicked}
                    vendorListUpdate={vendorListUpdate}
                />)
            })
        }   
        </section>
    )

}


export default VendorParent;