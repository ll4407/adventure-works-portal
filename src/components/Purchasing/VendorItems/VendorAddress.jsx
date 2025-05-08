import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';


function vendorAddresses(props){
    const {addresses} = props;


    const currentData = addresses.map((address, index) => {
        return (
            <div key={address.addressId}>
                <p>{index + 1}.</p>
                <p>{address.addressTypeName}</p>
                <p>{address.addressLine1}</p>
                <p>{address.addressLine2}</p>
                <p>{address.city}, {address.countryRegionCode}</p>
                <p>{address.postalCode}</p>
                <p>{address.countryRegionName}</p>
            </div>
        )
    });

    return(
        <section className={`${styles.vendorAddresses} ${styles.vendorFlex50}`}>
            <div>
                <h2>Addresses</h2>
                <p><Edit /></p>
            </div>

            {currentData}
        </section>
    )
}

export default vendorAddresses;