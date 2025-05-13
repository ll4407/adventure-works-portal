import axios from '../../api/axios';
import { toast } from 'react-toastify';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
<<<<<<< HEAD
=======
import VendorTitle from '../../components/Purchasing/VendorItems/VendorTitle';
import VendorContacts from '../../components/Purchasing/VendorItems/VendorContacts';
import VendorAddresses from '../../components/Purchasing/VendorItems/VendorAddress';
>>>>>>> PurchaseVendorEdit

import styles from './VendorDetails.module.css';
import modal from './PurchaseModal.module.css';

import { Link, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { ChevronDown } from '../../icons';
import { useCallback } from 'react';

function VendorDetails() {
<<<<<<< HEAD
    const { clicked } = useOutletContext();

	const [vendorName, setVendorName] = useState(null);
	const [businessEntityId, setBudinessId] = useState(null);
	const [contacts, setContacts] = useState([]);
	const [addressesFound, setAddresses] = useState([]);
=======
	const [vendor, setVendor] = useState(null);
>>>>>>> PurchaseVendorEdit

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

<<<<<<< HEAD
                    <Link onClick={clicked} to="/purchasing"><Close /></Link>
                </div>
=======
                <div>  
                    <VendorContacts contacts={vendor.contacts} storeId={vendor.businessEntityId}/>
>>>>>>> PurchaseVendorEdit

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
<<<<<<< HEAD
            <div className={`${modal.modalOverlay}`}>
                <article className={`${styles.mainVendorArticle} ${modal.modalContent}`}>
                    <Link onClick={clicked} to="/purchasing"><ChevronDown /><p>Back</p></Link>
                    {detailContent}
                </article>
            </div>
=======
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
>>>>>>> PurchaseVendorEdit
        </PageContext.Provider>
    );
}

export default VendorDetails;