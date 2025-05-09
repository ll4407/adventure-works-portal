import axios from '../../api/axios';
import { toast } from 'react-toastify';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import VendorTitle from '../../components/Purchasing/VendorItems/VendorTitle';
import VendorContacts from '../../components/Purchasing/VendorItems/VendorContacts';
import VendorAddresses from '../../components/Purchasing/VendorItems/VendorAddress';

import styles from './VendorDetails.module.css';

import { Link, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';

import { ChevronDown } from '../../icons';
import { useCallback } from 'react';

function VendorDetails() {
	const [vendor, setVendor] = useState(null);

    const [activePage, setActivePage] = useState('Vendors');
    const [filter, setFilter] = useState("");

	const { id, phone } = useParams();

    useEffect(() => {
        axios.get(`Vendor/${id}`)
            .then(resp => {
                setVendor(resp.data);
            })
            .catch(err => {
                toast.error(err);
            });
    }, [vendor, id]);


    function updateVendorTitle(vendorName, phone, id, account) {
        vendor.vendorName = vendorName;
        phone = phone;
        vendor.businessEntityId = id;
        vendor.accountNumber = account;
    }

    
    const detailContent = vendor === null ? <p>Loading</p> : (
        <div>
            <div className={styles.vendorContainer}>
                <VendorTitle vendor={vendor} vendorName={vendor.vendorName}  phone={phone}
                    accountNum={vendor.accountNumber} updateVendor={updateVendorTitle}/>

                <div>  
                    <VendorContacts contacts={vendor.contacts} />

                    <VendorAddresses addresses={vendor.addresses} />
                </div>
            </div>
        </div>
    );


    const context = {
        activePage:activePage,
        setActivePage: setActivePage,
        filter: filter,
        setFilter:setFilter
    }

    return (
        <PageContext.Provider value={context}>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}
                />
            <section className=''>

            </section>

            <article className={styles.mainVendorArticle}>
            <Link to="/purchasing"><ChevronDown /><p>Back</p></Link>
                {detailContent}
            </article>
        </PageContext.Provider>
    );
}

export default VendorDetails;