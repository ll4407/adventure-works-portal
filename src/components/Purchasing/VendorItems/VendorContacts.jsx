import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function VendorContacts(props){
    const {contacts} = props

    const [editActive, setEditActive] = useState(false)

    const [contactType, setContactType] = useState(null); 
    const [phoneType, setPhoneType] = useState(null); 

    useEffect(() => {
        axios.get(`ContactType`)
                    .then(resp => {
                        setContactType(resp.data);
                    })
                    .catch(err => {
                        toast.error(err);
                    });

        axios.get(`PhoneNumberType`)
                    .then(resp => {
                        setPhoneType(resp.data);
                    })
                    .catch(err => {
                        toast.error(err);
                    });
    }, [contactType, phoneType]);

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
                                    <div className={styles.formGrid}>
                                        <span>{index + 1}.</span>
                                        <div className={styles.SingleContact} key={contact.personId}>
                                            <label>
                                                <select type="text" name="personalTitle" aria-label="Personal Title" value={contact.personalTitle}>
                                                    <option value={''}>--Select--</option>
                                                    <option value='Mr.'>Mr.</option>
                                                    <option value='Ms.'>Ms.</option>
                                                </select>
                                            </label>
                                            <label>
                                                <input type="text" name="firstName" aria-label="First Name" placeholder={contact.firstName} />
                                            </label>
                                            <label>
                                                <input type="text" name="middleName" aria-label="Middle Name" placeholder={contact.middleName} />
                                            </label>
                                            <label>
                                                <input type="text" name="lastName" aria-label="Last Name" placeholder={contact.lastName} />
                                            </label>

                                            <label>
                                                {contactType === null ?  <></> : 
                                                <select type="text" name="contactType" aria-label="Contact Type" value={contact.contactTypeId} >
                                                    <option>--Select--</option>
                                                    
                                                     {contactType.map((types, index) => {
                                                        return (
                                                            <option key={index} value={types.contactTypeId}>{types.contactTypeName}</option>
                                                        )})
                                                        }
                                                </select>}
                                            </label>
                                                
                                            {contact.phoneNumbers.map((phone, index) => {
                                                return  (
                                                    <div key={index}>
                                                        <label>
                                                            {phoneType === null ?  <></> : 
                                                                <select type="text" name="phoneType" aria-label="Phone Type" value={phone.phoneNumberTypeId} >
                                                                    {phoneType.map((types, index) => {
                                                                        return (
                                                                            <option key={index} value={types.phoneNumberTypeId}>{types.phoneNumberTypeName}</option>
                                                                        )})
                                                                    }
                                                                </select>
                                                            }
                                                        </label>
                                                        <label>
                                                            <input type="text" name="phoneNumber" aria-label="Phone Number" placeholder={phone.phoneNumber} />
                                                        </label>
                                                    </div>
                                                )
                                            })}

                                            {contact.emailAddresses.map((email, index) => {
                                                return  (
                                                    <label key={index}>
                                                        <input type="text" name="emailAddress" aria-label="Email Address" placeholder={email.emailAddress} />
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
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