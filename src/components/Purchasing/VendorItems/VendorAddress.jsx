import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function vendorAddresses(props){
    const {addresses} = props;
    const [addressesCopy, setAddressesCopy] = useState(null); 

    const [editActive, setEditActive] = useState(false)

    const [countryRegions, setCountryRegions] = useState(null)
    const [states, setStates] = useState(null)

    const [country, setCountry] = useState(null)

    
    useEffect(() => {
        setAddressesCopy(addresses);
        setCountry(address.countryRegionCode)
    }, []);

    useEffect(() => {
        axios.get(`CountryRegion`)
                            .then(resp => {
                                setCountryRegions(resp.data);
                            })
                            .catch(err => {
                                toast.error(err);
                            });
    }, [countryRegions]);

    useEffect(() => {
        axios.get(`StateProvince/${country}`)
                            .then(resp => {
                                setStates(resp.data);
                            })
                            .catch(err => {
                                toast.error(err);
                            });
    }, [country]);


    const handleCountryChange = (event, address) => {
        setCountry(event.target.value);
        address.countryRegionCode = event.target.value;
    };

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
    const formData = addressesCopy === null ? <>Loading</> :
                    <> 
                        <div>
                            <h2>Addresses</h2>
                        </div>
                    
                        <form>
                            {addressesCopy.map((address, index) => {
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

                                        <div>
                                            <label>
                                                <input type="text" name="BusinessID" aria-label="Business ID" placeholder={address.city} />
                                            </label>
                                            <label>
                                                {countryRegions === null ?  <></> : 
                                                    <select type="text" name="BusinessID" aria-label="Business ID" placeholder={address.countryRegionCode}>
                                                        <option>--Select--</option>
                                                        {states.map((types, index) => {
                                                            return (
                                                                <option key={index} value={types.stateProvinceCode}>{types.stateProvinceCode}</option>
                                                            )})
                                                        }
                                                    </select>
                                                }
                                            </label>
                                        </div>

                                        <label>
                                            <input type="text" name="BusinessID" aria-label="Business ID" placeholder={address.postalCode} />
                                        </label>
                                        <label>
                                            {countryRegions === null ?  <></> : 
                                                <select type="text" name="countryRegionName" aria-label="Business ID" value={address.countryRegionCode}
                                                onChange={(event) => handleCountryChange(event, address)}>
                                                    <option>--Select--</option>
                                                    {countryRegions.map((types, index) => {
                                                        return (
                                                            <option key={index} value={types.countryRegionCode}>{types.countryRegionCode}</option>
                                                        )})
                                                    }
                                                </select>
                                            }
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