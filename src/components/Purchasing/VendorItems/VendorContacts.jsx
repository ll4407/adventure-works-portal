import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function VendorContacts(props){
    const {contacts, storeId } = props

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
    }, [contactType]);

    useEffect(() => {
        axios.get(`PhoneNumberType`)
                    .then(resp => {
                        setPhoneType(resp.data);
                    })
                    .catch(err => {
                        toast.error(err);
                    });
    }, [phoneType]);

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, []);




    //Updated API 
    const updateContact = useCallback((event) => {
            event.preventDefault();
            let newPersonArray = [];
            let newPhoneArray = [];
            let newEmailArray = [];

            const formElements = event.target.elements;

           //creates the person contact to update
            contacts.map((contact, index) => {     
                let newContact = {
                    businessEntityId: contact.businessEntityId,
                    personId: contact.personId,
                    personalTitle: formElements.personalTitle[index].value === '' ? contact.personalTitle : formElements.personalTitle[index].value,
                    firstName: formElements.firstName[index].value === '' ? contact.firstName : formElements.suffix[index].value,
                    middleName: formElements.middleName[index].value === '' ? contact.middleName : formElements.middleName[index].value,
                    lastName: formElements.lastName[index].value === '' ? contact.lastName : formElements.lastName[index].value,
                    suffix: formElements.suffix[index].value === '' ? contact.suffix : formElements.suffix[index].value,
                    contactTypeId: formElements.contactType[index].value === null ? contact.contactTypeId : formElements.contactType[index].value
                }

                //Creates the new phone information
                contact.phoneNumbers.map((phone) => {
                    let newPhone = {
                        businessEntityId: contact.businessEntityId,

                        newPhoneNumber: formElements.phoneNumber[index].value === '' ? phone.phoneNumber : formElements.phoneNumber[index].value,
                        originalPhoneNumber: phone.phoneNumber,

                        newPhoneNumberTypeId: Number(formElements.phoneType[index].value),
                        originalPhoneNumberTypeId: phone.phoneNumberTypeId
                    }

                    newPhoneArray.push(newPhone);
                });

                //Creates the new phone information
                contact.emailAddresses.map((email) => {
                    let newEmail = {
                        businessEntityId: contact.businessEntityId,
                        emailAddressId: email.emailAddressId,
                        emailAddress: formElements.emailAddress[index].value === '' ? email.emailAddress : formElements.emailAddress[index].value
                    }

                    newEmailArray.push(newEmail);
                });

                newPersonArray.push(newContact);
           });

           //Put requests for all areas
           //Contact
           newPersonArray.map((newContact) => {
                try{
                    axios.put(`Contact/${newContact.personId}/${storeId}`, newContact)
                            .then(resp => {
                                toast.success("Contact Data Submitted");
                            })
                            .catch(err => {
                                toast.error(err);
                        });
                }
                catch(err){
                    toast.error('Contact: ' + err);
                }
           }); 


           //Phone
           newPhoneArray.map((newPhone) => {
                try{
                    axios.put(`Phone/${newPhone.businessEntityId}`, newPhone)
                            .then(resp => {
                                toast.success("Phone Data Submitted");
                            })
                            .catch(err => {
                                toast.error(err);
                        });
                }
                catch(err){
                    toast.error('Phone: ' + err);
                }
           }); 


           //Email
           newEmailArray.map((newEmail) => {
                try{
                    axios.put(`Email/${newEmail.emailAddressId}/${newEmail.businessEntityId}`, newEmail)
                            .then(resp => {
                                toast.success("Email Data Submitted");
                            })
                            .catch(err => {
                                toast.error(err);
                        });
                }
                catch(err){
                    toast.error('Email: ' + err);
                }
           }); 

           handleEdit();
    });




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

                        <form onSubmit={updateContact}>
                            {contacts.map((contact, index) => {
                                return (
                                    <div className={`${styles.formGrid} ${index}`}>
                                        <span>{index + 1}.</span>
                                        <div className={`${styles.SingleContact} ${index}`}  key={contact.index}>
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
                                                <input type="text" name="suffix" aria-label="suffix" placeholder={contact.suffix} />
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