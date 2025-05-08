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
    }, [id]);

    
    const detailContent = vendor === null ? <p>Loading</p> : (
        <div>
            <div className={styles.vendorContainer}>
                <VendorTitle vendorName={vendor.vendorName}  phone={phone} businessEntityId={vendor.businessEntityId}/>

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