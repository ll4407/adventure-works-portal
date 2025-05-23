import styles from '../../../container/Purchasing/VendorDetails.module.css';
import { Edit } from '../../../icons';
import { useCallback, useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { toast } from 'react-toastify';

function VendorAddresses(props){
    const {addresses, updateVendorInfo} = props;
    const [addressesCopy, setAddressesCopy] = useState(null); 

    const [statesArray, setStatesArray] = useState([]);

    const [editActive, setEditActive] = useState(false)

    const [countryRegions, setCountryRegions] = useState(null)
    const [stateProv, setStateProv] = useState(null)
    const [addressTypes, setAddressTypes] = useState(null)
    

    //Makes copy of Address so we dont mutate orginal property 
    useEffect(() => {
        setAddressesCopy(addresses);
    }, []);


    //Gather the additonal information related to addresses from database
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
        addresses.map(async (address) => {            
            await axios.get(`StateProvince/${address.countryRegionCode}`)
                .then(resp => {
                    setStatesArray([...statesArray, resp.data])
                })
                .catch(err => {
                    toast.error(err);
                });
            })
    }, []);


    //updates states when country code changes
    const loadStates = (country, index) => {
        const newArray = [...statesArray];

        axios.get(`StateProvince/${country}`)
                .then(resp => {
                    newArray[index] = resp.data;

                    setStatesArray(newArray);
                })
                .catch(err => {
                    toast.error(err);
                });
    };

    const handleEdit = useCallback(() => {
        setEditActive(editActive => !editActive)
    }, [])



    //UPDATE Addresses in the database
    const updateAddresses = (event) => {
        event.preventDefault();
        let newAddressArray = [];

        addressesCopy.map((currAddress) => {
            const {changed, ...addressDetails} = currAddress;

            if(changed === true){
                newAddressArray.push(addressDetails);
            }
        });
  
        //Update Database
        newAddressArray.map((newAddress) => {
            axios.put(`Address/${newAddress.addressId}`, newAddress)
                    .then(resp => {
                        toast.success("Contact Data Submitted");
                    })
                    .catch(err => {
                        toast.error(err);
                });
        });   

        updateVendorInfo();
        handleEdit();
    }


    //fetch additonal data on select statement changes
    function addressName(id) {
        return addressTypes.find(type => type.addressTypeId == id).addressTypeName;
    }
    function stateCode(id) {
        return stateProv.find(item => item.stateProvinceId == id).stateProvinceCode;
    }
    function stateName(id) {
        return stateProv.find(item => item.stateProvinceId == id).stateProvinceName;
    }
    function countryName(code) {
        return countryRegions.find(item => item.countryRegionCode == code).countryRegionName;
    }


    //Current Data
    const currentData = addressesCopy === null ? <>Loading</> :
                        <>
                            <div>
                                <h2>Addresses</h2>
                                <p onClick={handleEdit}><Edit /></p>
                            </div>
                        
                            {addressesCopy.map((address, index) => {
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
                                                    onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                                    return {...add, addressTypeId: Number(event.target.value) , addressTypeName: addressName(event.target.value)
                                                                        , changed: true}
                                                                }else{
                                                                    return {...add}
                                                                }
                                                    }))}>
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
                                                <input type="text" name="addressLine1" aria-label="address Line 1" value={address.addressLine1} placeholder='Address 1'
                                                onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                                    return {...add, addressLine1: event.target.value, changed: true}
                                                                }else{
                                                                    return {...add}
                                                                }
                                                    }))} />
                                            </label>
                                            <label>
                                                <input type="text" name="addressLine2" aria-label="address Line 2" value={address.addressLine2} placeholder='Address 2'
                                                onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                            return {...add, addressLine2: event.target.value, changed: true}
                                                        }else{
                                                            return {...add}
                                                        }
                                                    }))} />
                                            </label>

                                            <div>
                                                <label>
                                                    <input type="text" name="city" aria-label="city" value={address.city} placeholder='City' 
                                                    onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                                    return {...add, city: event.target.value, changed: true}
                                                                }else{
                                                                    return {...add}
                                                                }
                                                    }))} />
                                                </label>
                                                <label>
                                                    {countryRegions === null ?  <></> : 
                                                        <>
                                                            {statesArray[index] === null ?  <></> : 
                                                                <>
                                                                    <select type="text" name="stateCode" aria-label="state Code" value={address.stateProvinceId}
                                                                    onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                                    if(add.addressId === address.addressId){
                                                                        if(event.target.value == ''){
                                                                           return {...add, stateProvinceId: null, stateProvinceCode: null,
                                                                                stateProvinceName: null, changed: true} 
                                                                        }else{
                                                                            return {...add, stateProvinceId: event.target.value, stateProvinceCode: stateCode(event.target.value),
                                                                                stateProvinceName: stateName(event.target.value), changed: true}
                                                                        }
                                                                    }else{
                                                                        return {...add}
                                                                    }
                                                                    }))}>

                                                                        <option value=''>--Select--</option>
                                                                        {statesArray[index] && statesArray[index].map((types, stateIndex) => {
                                                                            return ( 
                                                                                <option key={stateIndex} value={types.stateProvinceId}>{types.stateProvinceCode}</option>
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
                                                <input type="text" name="postalCode" aria-label="postal Code" value={address.postalCode} placeholder='Postal code'
                                                onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                                    return {...add, postalCode: event.target.value, changed: true}
                                                                }else{
                                                                    return {...add}
                                                                }
                                                    }))} />
                                            </label>
                                            <label>
                                                {countryRegions === null ?  <></> : 
                                                    <select type="text" name="countryCode" aria-label="country Code" value={address.countryRegionCode}
                                                    onChange={(event) => setAddressesCopy(prev => prev.map(add => {
                                                        if(add.addressId === address.addressId){
                                                            loadStates(event.target.value, index);
                                                            return {...add, countryRegionCode: event.target.value, countryRegionName: countryName(event.target.value)
                                                                , changed: true}
                                                        }else{
                                                            return {...add}
                                                        }
                                                    }))}>
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

export default VendorAddresses;