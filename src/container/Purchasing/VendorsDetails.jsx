import axios from '../../api/axios';
import { toast } from 'react-toastify';

import PageContext from "../../context/PageContext";
import VendorTitle from '../../components/Purchasing/VendorItems/VendorTitle';
import VendorContacts from '../../components/Purchasing/VendorItems/VendorContacts';
import VendorAddresses from '../../components/Purchasing/VendorItems/VendorAddress';

import styles from './VendorDetails.module.css';
import modal from './PurchaseModal.module.css';

import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { ChevronDown, Close } from '../../icons';

function VendorDetails() {
    const { clicked } = useOutletContext();
    
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


    function updateVendorTitle(vendorName, id, account) {
        vendor.vendorName = vendorName;
        vendor.businessEntityId = id;
        vendor.accountNumber = account;
    }

    const detailContent = vendor === null ? <p>Loading</p> : (
        <div>
            <div className={styles.vendorContainer}>
                <VendorTitle vendor={vendor} vendorName={vendor.vendorName}  phone={phone}
                    accountNum={vendor.accountNumber} updateVendor={updateVendorTitle} clicked={clicked}/>

                <div>  
                    <VendorContacts contacts={vendor.contacts} storeId={vendor.businessEntityId}/>

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
            <div className={`${modal.modalOverlay}`}>
                <article className={`${styles.mainVendorArticle} ${modal.modalContent}`}>
                    <Link onClick={clicked} to="/purchasing"><ChevronDown /><p>Back</p></Link>
                    {detailContent}
                </article>
            </div>
        </PageContext.Provider>
    );
}

export default VendorDetails;