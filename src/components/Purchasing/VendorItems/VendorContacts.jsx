import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';

function VendorContacts(props){
    const {contacts} = props



    const currentData = contacts.map((items, index) => {
        return (
            <div key={items.personId}>
                <p>{index + 1}.</p>
                <p> {items.personalTitle} {items.firstName} {items.middleName} {items.lastName} {items.suffix}</p>
                <p>({items.contactTypeName})</p>

                {items.phoneNumbers.map(numbers => {
                    return(
                        <p key={numbers.businessEntityId}>{numbers.phoneNumberTypeName}: {numbers.phoneNumber}</p>
                    )
                })}

                {items.emailAddresses.map(emails => {
                    return(
                        <p key={emails.emailAddressId}>Email: {emails.emailAddress}</p>
                    )
                })}
            </div>
        )
    });



    return(
        <section className={`${styles.vendorContacts} ${styles.vendorFlex50}`}>
            <div>
                <h2>Contacts</h2>
                <p><Edit /></p>
            </div>
            
            {currentData}
        </section>
    )
}

export default VendorContacts;