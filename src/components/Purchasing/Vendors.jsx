import PurchasingVendorTile from './PurchasingVendorTile';
import PageContext from '../../context/PageContext';
import styles from '../../container/Purchasing/Purchasing.module.css';

import axios from '../../api/axios';
import { motion } from 'framer-motion';

import { useEffect, useState, useContext, useMemo } from "react";
import { toast } from 'react-toastify';
import { Outlet, useOutletContext } from 'react-router';
import Loading from '../utils/Loading';
import { colors } from '../../utilities';

import sortedArray from '../../container/SortBy/Sortby';

function Vendors() {

    const [vendorsDisplayed, setVendorsDisplayed] = useState(null);
    const { vendorUpdateInfo, clicked, UpdateEveryVendor } = useOutletContext();
    const { filter } = useContext(PageContext)

    //Sorting 
    const [newArray, setNewArray] = useState(false);
    const [sortedBy, setSortedBy] = useState("");
    const [sortDirection, setSortDirection] = useState(false);
    //

    useEffect(() => {
        axios.get(`Vendor`)
            .then(resp => {
                setVendorsDisplayed(resp.data)
            })
            .catch(err => {
                toast.error(err); 
        });
    }, [vendorUpdateInfo]);

    //sorting
    useEffect(() => {
        setSortDirection(false); //Keeps track of current sort direction: ASC/DESC
    }, [sortedBy]);

    useEffect(() => {
        //activates sort function and sets filter list
    }, [newArray]);
    //sorted
    
    let filteredVendors = useMemo(() =>{
        if(!vendorsDisplayed) return []
        if(!filter) return vendorsDisplayed

        const lowered = filter.toLowerCase()
        return vendorsDisplayed.filter(v =>
            v.vendorName?.toLowerCase().includes(lowered) ||
            v.contactFirstName?.toLowerCase().includes(lowered) ||
            v.contactLastName?.toLowerCase().includes(lowered)
        )
    }, [filter, vendorsDisplayed])


    const currentData = vendorsDisplayed === null ? <Loading color={colors.green} /> :
            <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}>
                <div className={styles.VendorGridHeader}>
                    <p onClick={() => {setSortedBy("vendorName");
                    filteredVendors = sortedArray(filteredVendors, "vendorName", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Vendor Name</p>

                    <p onClick={() => {setSortedBy("contactPhone");
                    filteredVendors = sortedArray(filteredVendors, "contactPhone", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Phone</p>

                    <p onClick={() => {setSortedBy("businessEntityId");
                    filteredVendors = sortedArray(filteredVendors, "businessEntityId", "", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Business ID</p>

                    <p onClick={() => {setSortedBy("contactLastName");
                    filteredVendors = sortedArray(filteredVendors, "contactLastName", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Primary Contact</p>

                    <p onClick={() => {setSortedBy("contactEmail");
                    filteredVendors = sortedArray(filteredVendors, "contactEmail", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Email</p>

                    <p onClick={() => {setSortedBy("stateProvinceName");
                    filteredVendors = sortedArray(filteredVendors, "stateProvinceName", "name", sortDirection); 
                    setNewArray(x => !x); setSortDirection(x => !x);}}>Billing Address</p>
                    
                    <p>Options</p>
                </div>


                {filteredVendors.map(vendorsList => {
                    return(
                        <PurchasingVendorTile 
                        key={vendorsList.businessEntityId}
                        vendorName={vendorsList.vendorName}
                        phone={vendorsList.contactPhone}
                        businessId={vendorsList.businessEntityId}   
                        primaryContact={vendorsList.contactFirstName + ' ' + vendorsList.contactLastName}
                        email={vendorsList.contactEmail}
                        addressLine={vendorsList.addressLine1}
                        addressLine2={vendorsList.addressLine2}
                        city={vendorsList.city}
                        state={vendorsList.stateProvinceName}
                        postal={vendorsList.postalCode}
                        clicked={clicked}
                    />)
                    })
                }   
                <Outlet context={{clicked: clicked, vendorUpdateMethod: UpdateEveryVendor}}/>
        </motion.section>

    return (
        <>
            {currentData}
        </>
    )

}


export default Vendors;