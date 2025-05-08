import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useState } from 'react';

function VendorContacts(props){
    const {contacts} = props

    const [editActive, setEditActive] = useState(false)

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])

    //Current Data
    const currentData = 
                <>
                    <div>
                        <h2>Contacts</h2>
                        <p onClick={handleEdit}><Edit /></p>
                    </div>

                    {contacts.map((contact, index) => {
                        return (
                                <div key={contact.personId}>
                                    <p>{index + 1}.</p>
                                    <p> {contact.personalTitle} {contact.firstName} {contact.middleName} {contact.lastName} {contact.suffix}</p>
                                    <p>({contact.contactTypeName})</p>

                                    {contact.phoneNumbers.map(numbers => {
                                        return(
                                            <p key={numbers.businessEntityId}>{numbers.phoneNumberTypeName}: {numbers.phoneNumber}</p>
                                        )
                                    })}

                                    {contact.emailAddresses.map(emails => {
                                        return(
                                            <p key={emails.emailAddressId}>Email: {emails.emailAddress}</p>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </>;

    //EDIT DATA
    const formData = 
                    <> 
                        <div>
                            <h2>Contacts</h2>
                        </div>

                        <form>
                            {contacts.map((contact, index) => {
                                return (  
                                        <>
                                            <label key={contact.personId}>
                                                <input type="text" name="vendorName" aria-label="vendorName" placeholder={contact.personalTitle} />
                                            </label>
                                            <label>
                                                <input type="text" name="Phone" aria-label="Phone" placeholder={contact.firstName} />
                                            </label>
                                            <label>
                                                <input type="text" name="BusinessID" aria-label="Business ID" placeholder={contact.middleName} />
                                            </label>
                                        </>
                                    )
                                })
                            }

                            <button type='Submit'>Save Changes</button>             
                            <p onClick={handleEdit}>Back</p>
                        </form>
                    </>;

    //Display selection
    const dataDisplay = editActive === false ? currentData : formData;

    return(
        <section className={`${styles.vendorContacts} ${styles.vendorFlex50}`}>            
            {dataDisplay}
        </section>
    )
}

export default VendorContacts;