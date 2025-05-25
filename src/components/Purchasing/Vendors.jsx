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
    
    const filteredVendors = useMemo(() =>{
        if(!vendorsDisplayed) return []
        if(!filter) return vendorsDisplayed

        const lowered = filter.toLowerCase()
        return vendorsDisplayed.filter(v =>
            v.vendorName?.toLowerCase().includes(lowered) ||
            v.contactFirstName?.toLowerCase().includes(lowered) ||
            v.contactLastName?.toLowerCase().includes(lowered)
        )
    }, [filter, vendorsDisplayed])

    //sorting function
    //activates sort function and sets filter list
    const handleSortChange = (name, dataType) => {
        let direction;

        if(sortedBy !== name){
            setSortedBy(name);

            direction = false;
        }
        else{
            setSortDirection(x => !x);

            direction = !sortDirection;
        }

        sortedArray(filteredVendors, name, dataType, direction);

        setNewArray(x => !x);
    }

    const currentData = vendorsDisplayed === null ? <Loading color={colors.green} /> :
            <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}>
                <div className={styles.VendorGridHeader}>
                    <p onClick={() => {handleSortChange("vendorName", "name");}}>Vendor Name&#x25BE;</p>

                    <p onClick={() => {handleSortChange("contactPhone", "name");}}>Phone&#x25BE;</p>

                    <p onClick={() => {handleSortChange("businessEntityId", "");}}>Business ID&#x25BE;</p>

                    <p onClick={() => {handleSortChange("contactLastName", "name");}}>Primary Contact&#x25BE;</p>

                    <p onClick={() => {handleSortChange("contactEmail", "name");}}>Email&#x25BE;</p>

                    <p onClick={() => {handleSortChange("stateProvinceName", "name");}}>Billing Address&#x25BE;</p>
                    
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