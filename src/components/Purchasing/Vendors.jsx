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


function Vendors() {

    const [vendorsDisplayed, setVendorsDisplayed] = useState(null);
    const { vendorUpdateInfo, clicked, UpdateEveryVendor } = useOutletContext();
    const { filter } = useContext(PageContext)


    useEffect(() => {
        axios.get(`Vendor`)
            .then(resp => {
                setVendorsDisplayed(resp.data)
            })
            .catch(err => {
                toast.error(err); 
        });
    }, [vendorUpdateInfo]);



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


    const currentData = vendorsDisplayed === null ? <Loading color={colors.green} /> :
            <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}>
                <div className={styles.VendorGridHeader}>
                    <p>Vendor Name</p>
                    <p>Phone</p>
                    <p>Business ID</p>
                    <p>Primary Contact</p>
                    <p>Email</p>
                    <p>Billing Address</p>
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