import axios from '../../api/axios';
import { toast } from 'react-toastify';

import VendorTitle from '../../components/Purchasing/VendorItems/VendorTitle';
import VendorContacts from '../../components/Purchasing/VendorItems/VendorContacts';
import VendorAddresses from '../../components/Purchasing/VendorItems/VendorAddress';

import styles from './VendorDetails.module.css';
import modal from './PurchaseModal.module.css';

import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { ChevronDown } from '../../icons';

function VendorDetails() {
    const { clicked, vendorUpdateMethod } = useOutletContext();
    
	const [vendor, setVendor] = useState(null);

	const [vendorUpdateInfo, setVendorUpdateInfo] = useState(false);

	const { id, phone } = useParams();

    useEffect(() => {
        async function FetchTheData() {
            await axios.get(`Vendor/${id}`)
            .then(resp => {
                setVendor(resp.data);
            })
            .catch(err => {
                toast.error(err);
            });
        }
        
        FetchTheData();
    }, [vendorUpdateInfo, id]);

    function UpdateTheVendor() {
        setVendorUpdateInfo(vendorUpdateInfo => !vendorUpdateInfo);
    }

    const detailContent = vendor === null ? <p>Loading</p> : (
        <div>
            <div className={styles.vendorContainer}>
                <VendorTitle 
                    vendor={vendor} 
                    vendorName={vendor.vendorName}  
                    phone={phone}
                    accountNum={vendor.accountNumber} 
                    updateVendorInfo={UpdateTheVendor} 
                    clicked={clicked} 
                    vendorUpdateMethod={vendorUpdateMethod} />

                <div>  
                    <VendorContacts 
                        contacts={vendor.contacts} 
                        storeId={vendor.businessEntityId} 
                        updateVendorInfo={UpdateTheVendor} />

                    <VendorAddresses 
                    addresses={vendor.addresses} 
                    updateVendorInfo={UpdateTheVendor} />
                </div>
            </div>
        </div>
    );




    return (

            <div className={`${modal.modalOverlay}`}>
                <article className={`${styles.mainVendorArticle} ${modal.modalContent}`}>
                    <Link onClick={clicked} to="/purchasing/vendors"><ChevronDown /><p>Back</p></Link>
                    {detailContent}
                </article>
            </div>

    );
}

export default VendorDetails;