import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useState } from 'react';


function vendorAddresses(props){
    const {addresses} = props;

    const [editActive, setEditActive] = useState(false)

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])

    //Cuurrent Data
    const currentData = 
                        <>
                            <div>
                                <h2>Addresses</h2>
                                <p onClick={handleEdit}><Edit /></p>
                            </div>
                        
                            {addresses.map((address, index) => {
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
                                })
                            }
                        </>

    //Form Data
    const formData = 
                    <> 
                        <div>
                            <h2>Addresses</h2>
                        </div>
                    
                        <form>
                            {addresses.map((address, index) => {
                                return (  
                                    <>
                                        <label key={address.addressId}>
                                            <input type="text" name="vendorName" aria-label="vendorName" placeholder={address.addressTypeName} />
                                        </label>
                                        <label>
                                            <input type="text" name="Phone" aria-label="Phone" placeholder={address.addressLine1} />
                                        </label>
                                        <label>
                                            <input type="text" name="BusinessID" aria-label="Business ID" placeholder={address.addressLine2} />
                                        </label>

                                        <button type='Submit'>Save Changes</button>
                                        
                                        <p onClick={handleEdit}>Back</p>
                                    </>
                                    )
                                })
                            }
                        </form>
                    </>;


    //Display Data
    const dataDisplay = editActive === false ? currentData : formData;

    return(
        <section className={`${styles.vendorAddresses} ${styles.vendorFlex50}`}>
            {dataDisplay}
        </section>
    )
}

export default vendorAddresses;