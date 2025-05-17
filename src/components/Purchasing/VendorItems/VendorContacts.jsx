import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function VendorContacts(props){
    const { contacts, storeId, updateVendorInfo} = props
    const [contactCopy, setContactCopy] = useState(null); 

    const [editActive, setEditActive] = useState(false)

    const [contactType, setContactType] = useState(null); 
    const [phoneType, setPhoneType] = useState(null); 

    useEffect(() => {
        setContactCopy(contacts);
    }, []);

    useEffect(() => {
        axios.get(`ContactType`)
                    .then(resp => {
                        setContactType(resp.data);
                    })
                    .catch(err => {
                        toast.error(err);
                    });
    }, []);

    useEffect(() => {
        axios.get(`PhoneNumberType`)
                    .then(resp => {
                        setPhoneType(resp.data);
                    })
                    .catch(err => {
                        toast.error(err);
                    });
    }, []);



    function findContactType(id) {
        return contactType.find(item => item.contactTypeId == id).contactTypeName;
    }
    function findPhoneType(id) {
        return phoneType.find(item => item.phoneNumberTypeId == id).phoneNumberTypeName;
    }

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, []);



    //Updated API 
    const updateContact = (event) => {
        event.preventDefault();
        let newPersonArray = [];
        let newPhoneArray = [];
        let newEmailArray = [];


        contactCopy.map((currContact) => {
            const {changed, phoneChanged, emailChanged, phoneNumbers, emailAddresses, ...contactDetails} = currContact;

            if(changed === true){
                newPersonArray.push(contactDetails);
            }
            if(phoneChanged === true){
                newPhoneArray.push(phoneDetails);
            }
            if(emailChanged === true){
                newEmailArray.push(emailDetails);
            }
        });
            
            
        //Put requests for all areas
        //Contact 
        newPersonArray.map((newContact) => {
            axios.put(`Contact/${newContact.personId}/${storeId}`, newContact)
                .then(() => {
                    toast.success("Contact Data Submitted");
                })
                .catch(err => {
                    toast.error(err);
            });
        });    
            
        //Phone
        newPhoneArray.map((newPhone) => {
            axios.put(`Phone/${newPhone.businessEntityId}`, newPhone)
                .then(() => {
                    toast.success("Phone Data Submitted");
                })
                .catch(err => {
                    toast.error(err);
            });
        });
                
        //Email
        newEmailArray.map((newEmail) => {
            axios.put(`Email/${newEmail.emailAddressId}/${newEmail.businessEntityId}`, newEmail)
                .then(() => {
                    toast.success("Email Data Submitted");

                })
                .catch(err => {
                    toast.error(err);
            });
        }); 
                
        updateVendorInfo();

        handleEdit();
    };




    //Current Data
    const currentData = contactCopy === null ? <>Loading</> :
                <>
                    <div>
                        <h2>Contacts</h2>
                        <p onClick={handleEdit}><Edit /></p>
                    </div>

                    {contactCopy.map((contact, index) => {
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
    const formData = contactCopy === null ? <>Loading</> :
                    <> 
                        <div>
                            <h2>Contacts</h2>
                        </div>

                        <form onSubmit={updateContact}>
                            {contactCopy.map((contact, index) => {
                                return (
                                    <div className={`${styles.formGrid} ${index}`}>
                                        <span>{index + 1}.</span>
                                        <div className={`${styles.SingleContact} ${index}`}  key={contact.index}>
                                            <label>
                                                <select type="text" name="personalTitle" aria-label="Personal Title" value={contact.personalTitle}
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, personalTitle: event.target.value
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))}>

                                                    <option value={''}>--Select--</option>
                                                    <option value='Mr.'>Mr.</option>
                                                    <option value='Ms.'>Ms.</option>
                                                </select>
                                            </label>
                                            <label>
                                                <input type="text" name="firstName" aria-label="First Name" placeholder={contact.firstName} 
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, firstName: event.target.value
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))} />
                                            </label>
                                            <label>
                                                <input type="text" name="middleName" aria-label="Middle Name" placeholder={contact.middleName} 
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, middleName: event.target.value
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))} />
                                            </label>
                                            <label>
                                                <input type="text" name="lastName" aria-label="Last Name" placeholder={contact.lastName} 
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, lastName: event.target.value
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))} />
                                            </label>
                                            <label>
                                                <input type="text" name="suffix" aria-label="suffix" placeholder={contact.suffix} 
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, suffix: event.target.value
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))} />
                                            </label>

                                            <label>
                                                {contactType === null ?  <></> : 
                                                <select type="text" name="contactType" aria-label="Contact Type" value={contact.contactTypeId} 
                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                        if(cont.personId === contact.personId){
                                                            return {...cont, contactTypeId: Number(event.target.value), contactTypeName: findContactType(event.target.value)
                                                                , changed: true}
                                                        }else{
                                                            return {...cont}
                                                        }
                                                    }))} >
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
                                                                <select type="text" name="phoneType" aria-label="Phone Type" value={phone.phoneNumberTypeId} 
                                                                onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                                    if(cont.personId === contact.personId){
                                                                        return {...cont, phoneNumbers: [{ businessEntityId: phone.businessEntityId,
                                                                                phoneNumber: phone.phoneNumber,
                                                                                phoneNumberTypeId: Number(event.target.value),
                                                                                phoneNumberTypeName: findPhoneType(event.target.value)
                                                                            }]
                                                                         , phoneChanged: true
                                                                        }
                                                                    }else{
                                                                        return {...cont}
                                                                    }
                                                                }))} >
                                                                    {phoneType.map((types, index) => {
                                                                        return (
                                                                            <option key={index} value={types.phoneNumberTypeId}>{types.phoneNumberTypeName}</option>
                                                                        )})
                                                                    }
                                                                </select>
                                                            }
                                                        </label>
                                                        <label>
                                                            <input type="text" name="phoneNumber" aria-label="Phone Number" placeholder={phone.phoneNumber} 
                                                            onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                                    if(cont.personId === contact.personId){
                                                                        return {...cont, phoneNumbers: [{ businessEntityId: phone.businessEntityId,
                                                                                phoneNumber: event.target.value,
                                                                                phoneNumberTypeId: phone.phoneNumberTypeId,
                                                                                phoneNumberTypeName: phone.phoneNumberTypeName
                                                                            }]
                                                                        , phoneChanged: true
                                                                    }
                                                                    }else{
                                                                        return {...cont}
                                                                    }
                                                                }))} />
                                                        </label>
                                                    </div>
                                                )
                                            })}



                                            {contact.emailAddresses.map((email, index) => {
                                                return  (
                                                    <label key={index}>
                                                        <input type="text" name="emailAddress" aria-label="Email Address" placeholder={email.emailAddress} 
                                                        onChange={(event) => setContactCopy(prev => prev.map(cont => {
                                                                    if(cont.personId === contact.personId){
                                                                        return {...cont, emailAddresses: [{ businessEntityId: email.businessEntityId,
                                                                                emailAddressId: email.emailAddressId,
                                                                                emailAddress: event.target.value
                                                                            }]
                                                                            , emailChanged: true
                                                                        }
                                                                    }else{
                                                                        return {...cont}
                                                                    }
                                                                }))} />
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