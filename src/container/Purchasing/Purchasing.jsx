import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PurchasingDetailsTile from '../../components/Purchasing/PurchasingDetailsTile';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { loadValuesAsync } from '../../store/purchasing';


function Purchasing(){

    const dispatch = useDispatch();
	const { listItems } = useSelector(state => state.purchase);

    const [tabSelected, setTabSelected] = useState(1);


    useEffect(() => {
        dispatch(loadValuesAsync());
    });


    const listValuesVendors = listItems.map(listItems => {
        return (<Link to={'/purchasing/' + listItems.businessEntityId} key={listItems.businessEntityId}>
                <PurchasingDetailsTile 
                    vendorName={listItems.vendorName}
                    phone={listItems.contactPhone}
                    businessId={listItems.businessEntityId}   
                    primaryContact={listItems.contactFirstName + ' ' + listItems.contactLastName}
                    email={listItems.contactEmail}
                    billingAddress={listItems.addressLine1}
                />
            </Link>
        );
    });

    const listValuesOrders = listItems.map(listItems => {
        return (
            <PurchasingDetailsTile 
                productName={''}
                vendorName={''}
                orderDate={''}
                orderQuantity={''}   
                totalDue={''}
                shipDate={''}
            />
        );
    });








    const selectedLayout = tabSelected === 1 ? listValuesVendors : listValuesOrders;

    return(
        <>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}/>
            <section>
                {selectedLayout}
            </section>
        </>

    )
}

export default Purchasing;