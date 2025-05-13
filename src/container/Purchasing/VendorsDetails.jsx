import axios from '../../api/axios';
import { toast } from 'react-toastify';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";

import styles from './VendorDetails.module.css';
import modal from './PurchaseModal.module.css';

import { Link, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { Edit, ChevronDown, Close } from '../../icons';

function VendorDetails() {
    const { clicked } = useOutletContext();

	const [vendorName, setVendorName] = useState(null);
	const [businessEntityId, setBudinessId] = useState(null);
	const [contacts, setContacts] = useState([]);
	const [addressesFound, setAddresses] = useState([]);

    const [activePage, setActivePage] = useState('Vendors');
    const [filter, setFilter] = useState("");

	const { id, phone } = useParams();

    useEffect(() => {
        axios.get(`Vendor/${id}`)
            .then(resp => {
                setVendorName(resp.data.vendorName);
                setBudinessId(resp.data.businessEntityId);
                setContacts(resp.data.contacts);
                setAddresses(resp.data.addresses);
            })
            .catch(err => {
                toast.error(err);
            });
    }, [id]);

    const detailContent = contacts === null ? <p>Loading</p> : (
        <div>
            <div className={styles.vendorContainer}>
                <div>
                    <h1>{vendorName}</h1>
                    <p><Edit /></p>

                    <Link onClick={clicked} to="/purchasing"><Close /></Link>
                </div>

                <p>Phone: {phone}</p>
                <p>Business ID: {businessEntityId}</p>

                <div>
                    <section className={`${styles.vendorContacts} ${styles.vendorFlex50}`}>
                        <div>
                            <h2>Contacts</h2>
                            <p><Edit /></p>
                        </div>
                        {contacts.map((items, index) => {
                            return (
                                <div key={items.personId}>
                                    <p>{index + 1}.</p>
                                    <p> {items.personalTitle} {items.firstName} {items.middleName} {items.lastName} {items.suffix}</p>
                                    <p>({items.contactTypeName})</p>

                                    {items.phoneNumbers.map(numbers => {
                                        return(
                                            <p key={numbers.businessEntityId}>{numbers.phoneNumberTypeName}: {numbers.phoneNumber}</p>
                                        )
                                    })}

                                    {items.emailAddresses.map(emails => {
                                        return(
                                            <p key={emails.emailAddressId}>Email: {emails.emailAddress}</p>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </section>

                    <section className={`${styles.vendorAddresses} ${styles.vendorFlex50}`}>
                        <div>
                            <h2>Addresses</h2>
                            <p><Edit /></p>
                        </div>
                        {addressesFound.map((address, index) => {
                            return (
                                <div key={address.addressId}>
                                    <p>{index + 1}.</p>
                                    <p>{address.addressTypeName}</p>
                                    <p>{address.addressLine1}</p>
                                    <p>{address.addressLine2}</p>
                                    <p>{address.city}, {address.countryRegionCode}</p>
                                    <p>{address.postalCode}</p>
                                    <p>{address.countryRegionName}</p>
                                </div>
                            )
                        })}
                    </section>
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