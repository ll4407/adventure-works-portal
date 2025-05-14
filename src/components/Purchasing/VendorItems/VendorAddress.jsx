import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function vendorAddresses(props){
    const {addresses} = props;
    const [addressesCopy, setAddressesCopy] = useState(null); 

    const [statesArray, setStatesArray] = useState([]);

    const [editActive, setEditActive] = useState(false)

    const [countryRegions, setCountryRegions] = useState(null)
    const [stateProv, setStateProv] = useState(null)
    const [addressTypes, setAddressTypes] = useState(null)
    
    useEffect(() => {
        setAddressesCopy(addresses);
    }, []);

    useEffect(() => {
        axios.get(`CountryRegion`)
                            .then(resp => {
                                setCountryRegions(resp.data);
                            })
                            .catch(err => {
                                toast.error(err);
                            });
    }, []);

    useEffect(() => {
        axios.get(`AddressType`)
                            .then(resp => {
                                setAddressTypes(resp.data);
                            })
                            .catch(err => {
                                toast.error(err);
                            });
    }, []);

    useEffect(() => {
        axios.get(`StateProvince`)
                            .then(resp => {
                                setStateProv(resp.data);
                            })
                            .catch(err => {
                                toast.error(err);
                            });
    }, []);
    

    useEffect(() => {     
        try{ 
            addresses.map(async (address, index) => {            
                await axios.get(`StateProvince/${address.countryRegionCode}`)
                            .then(resp => {
                                setStatesArray([...statesArray, resp.data])
                            })
                            .catch(err => {
                                toast.error(err);
                            });
            })

        }catch{

        }

    }, []);


    function loadStates(country, index) {
        const newArray = [...statesArray];

        axios.get(`StateProvince/${country}`)
                .then(resp => {
                    newArray[index] = resp.data;
                })
                .catch(err => {
                    toast.error(err);
                });

        setStatesArray(newArray);

        console.log(statesArray)

    };

    const handleCountryChange = (event, address, index) => {
        loadStates(event.target.value, index);
        address.countryRegionCode = event.target.value;
    };
    const handleStateChange = (event, address) => {
        address.stateProvinceCode = event.target.value;
    };
    const handleAddressChange = (event, address) => {
        address.addressTypeId = event.target.value;
    };

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])



    //UPDATE Addresses method
    const updateAddresses = useCallback((event) => {
            event.preventDefault();
            let newAddressArray = [];

            const formElements = event.target.elements;

            //grab all address information 
            if(addresses.length > 1){
                //FOR entries with multiple addresses
                addresses.map((address, index) => { 
                    let newAddress = {
                        businessEntityId: address.businessEntityId,
                        addressId: address.addressId,

                        addressTypeId: formElements.addressType[index].value === 'none' ? address.addressTypeId : formElements.addressType[index].value,
                        addressTypeName: formElements.addressType[index].value === 'none' ? address.addressTypeName : addressName(formElements.addressType[index].value),

                        addressLine1: formElements.addressLine1[index].value === '' ? address.addressLine1 : formElements.addressLine1[index].value,
                        addressLine2: formElements.addressLine2[index].value === '' ? address.addressLine2 : formElements.addressLine2[index].value,
                        city: formElements.city[index].value === '' ? address.city : formElements.city[index].value,

                        stateProvinceId: formElements.addressType[index].value === 'none' ? 0 : stateID(formElements.stateCode[index].value),
                        stateProvinceCode: formElements.addressType[index].value === 'none' ? null : formElements.stateCode[index].value,
                        stateProvinceName: formElements.addressType[index].value === 'none' ? null : stateName(formElements.stateCode[index].value),

                        postalCode: formElements.postalCode[index].value === '' ? address.postalCode : formElements.postalCode[index].value,

                        countryRegionCode: formElements.countryCode[index].value === 'none' ? address.countryRegionCode : formElements.countryCode[index].value,
                        countryRegionName: formElements.countryCode[index].value === 'none' ? address.countryRegionName : countryName(formElements.countryCode[index].value)
                    }

                    newAddressArray.push(newAddress);
                });
            }
            else {
                //FOR entries with one address
                addresses.map((address, index) => { 
                    let newAddress = {
                        businessEntityId: address.businessEntityId,
                        addressId: address.addressId,

                        addressTypeId: formElements.addressType.value === 'none' ? address.addressTypeId : formElements.addressType.value,
                        addressTypeName: formElements.addressType.value === 'none' ? address.addressTypeName : addressName(formElements.addressType.value),

                        addressLine1: formElements.addressLine1.value === '' ? address.addressLine1 : formElements.addressLine1.value,
                        addressLine2: formElements.addressLine2.value === '' ? address.addressLine2 : formElements.addressLine2.value,
                        city: formElements.city.value === '' ? address.city : formElements.city.value,

                        stateProvinceId:  formElements.stateCode.value === 'none' ? 0 : stateID(formElements.stateCode.value),
                        stateProvinceCode: formElements.stateCode.value === 'none' ? '' : formElements.stateCode.value,
                        stateProvinceName: formElements.stateCode.value === 'none' ? '' : stateName(formElements.stateCode.value),

                        postalCode: formElements.postalCode.value === '' ? address.postalCode : formElements.postalCode.value,

                        countryRegionCode: formElements.countryCode.value === 'none' ? address.countryRegionCode : formElements.countryCode.value,
                        countryRegionName: formElements.countryCode.value === 'none' ? address.countryRegionName : countryName(formElements.countryCode.value)
                    }

                    newAddressArray.push(newAddress);
                });
            }

            //Update Database
            try{
                newAddressArray.map((newAddress) => {
                    console.log(newAddress)
                    axios.put(`Address/${newAddress.addressId}`, newAddress)
                            .then(resp => {
                            })
                            .catch(err => {
                                toast.error(err);
                        });
                });

                toast.success("Contact Data Submitted");
            }
            catch(err){
                toast.error('Contact: ' + err);
            }

            handleEdit();
    })

    function addressName(id) {
        return addressTypes[id].addressTypeName;
    }
    function stateID(code) {
        const index = stateProv.findIndex(item => item.stateProvinceCode == code)
        return stateProv[index].stateProvinceId;
    }
    function stateName(code) {
        const index = stateProv.findIndex(item => item.stateProvinceCode == code)
        return stateProv[index].stateProvinceName;
    }
    function countryName(code) {
        const index = countryRegions.findIndex(item => item.countryRegionCode == code)
        return countryRegions[index].countryRegionName;
    }

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
                                        <p>{address.city}, {address.stateProvinceCode}</p>
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
                    
                        <form onSubmit={updateAddresses}>
                            {addressesCopy.map((address, index) => {
                                return (  
                                    <>
                                    <div className={`${styles.formGridAddress}`}>
                                        <span>{index + 1}.</span>

                                        <div className={`${styles.singleAddress}`}>
                                            <label key={address.addressId}>
                                                {addressTypes === null ?  <></> : 
                                                    <select type="text" name="addressType" aria-label="address Type" value={address.addressTypeId}
                                                    onChange={(event) => handleAddressChange(event, address)}>
                                                        <option value='none'>--Select--</option>
                                                            {addressTypes.map((types, addressIndex) => {
                                                                return (
                                                                    <option key={addressIndex} value={types.addressTypeId}>{types.addressTypeName}</option>
                                                                )})
                                                            }
                                                    </select>
                                                }
                                            </label>
                                            <label>
                                                <input type="text" name="addressLine1" aria-label="address Line 1" placeholder={address.addressLine1} />
                                            </label>
                                            <label>
                                                <input type="text" name="addressLine2" aria-label="address Line 2" placeholder={address.addressLine2} />
                                            </label>

                                            <div>
                                                <label>
                                                    <input type="text" name="city" aria-label="city" placeholder={address.city} />
                                                </label>
                                                <label>
                                                    {countryRegions === null ?  <></> : 
                                                        <>
                                                            {statesArray[index] === null ?  <></> : 
                                                                <>
                                                                    <select type="text" name="stateCode" aria-label="state Code" value={address.stateProvinceCode}
                                                                    onChange={(event) => handleStateChange(event, address)}>
                                                                        <option value='none'>--Select--</option>
                                                                        {statesArray[index] && statesArray[index].map((types, stateIndex) => {
                                                                            return ( 
                                                                                <option key={stateIndex} value={types.stateProvinceCode}>{types.stateProvinceCode}</option>
                                                                            )})
                                                                        }
                                                                    </select>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </label>
                                            </div>

                                            <label>
                                                <input type="text" name="postalCode" aria-label="postal Code" placeholder={address.postalCode} />
                                            </label>
                                            <label>
                                                {countryRegions === null ?  <></> : 
                                                    <select type="text" name="countryCode" aria-label="country Code" value={address.countryRegionCode}
                                                    onChange={(event) => handleCountryChange(event, address, index)}>
                                                        <option value='none'>--Select--</option>
                                                        {countryRegions.map((types, countryIndex) => {
                                                            return (
                                                                <option key={countryIndex} value={types.countryRegionCode}>{types.countryRegionCode}</option>
                                                            )})
                                                        }
                                                    </select>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    </>
                                    )
                                })
                            }

                            <button type='Submit'>Save Changes</button>
                                        
                            <p onClick={handleEdit}>Back</p>
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