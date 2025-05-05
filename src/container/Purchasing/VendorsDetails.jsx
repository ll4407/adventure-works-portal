import axios from '../../api/axios';
import { toast } from 'react-toastify';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";

import { Link, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Edit, ChevronDown } from '../../icons';

function VendorDetails() {
	const [vendorName, setVendorName] = useState(null);
	const [businessEntityId, setBudinessId] = useState(null);

	const [contacts, setContacts] = useState([]);
	const [addressesFound, setAddresses] = useState([]);

    const [activePage, setActivePage] = useState('Vendors');
    const [filter, setFilter] = useState("");

	const { id } = useParams();

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

    const detailContent = (
        <article>
            <section>
                <h1>{vendorName} <span><Edit /></span></h1>
                <p>{businessEntityId}</p>

                <section>
                    <h2>Contacts <span><Edit /></span></h2>
                    {contacts.map((items, index) => {
                        return (
                            <div key={items.personId}>
                                <p>{index + 1}. {items.personalTitle} {items.firstName} {items.middleName} {items.lastName} {items.suffix}</p>

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

                <section>
                    <h2>Addresses <span><Edit /></span></h2>
                    {addressesFound.map((address, index) => {
                        return (
                            <div key={address.addressId}>
                                <p>{index + 1}. {address.addressLine1}</p>
                                <p>{address.addressLine2}</p>
                                <p>{address.city}, {address.countryRegionCode}</p>
                                <p>{address.postalCode}</p>
                                <p>{address.countryRegionName}</p>
                            </div>
                        )
                    })}
                </section>
            </section>
        </article>
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

            <article>
                <Link to="/purchasing"><ChevronDown />Back</Link>
                {detailContent}
            </article>
        </PageContext.Provider>
    );
}

export default VendorDetails;