import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PurchasingVendorTile from '../../components/Purchasing/PurchasingVendorTile';
import PurchasingOrderTile from '../../components/Purchasing/PurchasingOrderTile';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { loadVendorsValuesAsync, loadOrdersValuesAsync } from '../../store/purchasing';


function Purchasing(){

    const dispatch = useDispatch();
	const { vendorsList, ordersList } = useSelector(state => state.purchase);

    const [tabSelected, setTabSelected] = useState(1);


    //Intial Loading of data - doing both so that there is only a one time load when this page is launch
    useEffect(() => {
        dispatch(loadVendorsValuesAsync());
        dispatch(loadOrdersValuesAsync());
    });


    

    const listValuesVendors = vendorsList.map(vendorsList => {
        return (<Link to={'/purchasing/' + vendorsList.businessEntityId} key={vendorsList.businessEntityId}>
                <PurchasingVendorTile 
                    vendorName={vendorsList.vendorName}
                    phone={vendorsList.contactPhone}
                    businessId={vendorsList.businessEntityId}   
                    primaryContact={vendorsList.contactFirstName + ' ' + vendorsList.contactLastName}
                    email={vendorsList.contactEmail}
                    billingAddress={vendorsList.addressLine1}
                />
            </Link>
        );
    });

    const listValuesOrders = ordersList.map(ordersList => {
        return (
            <Link to={'/purchasing/' + ordersList.id} key={ordersList.id}>
                <PurchasingOrderTile 
                    productName={ordersList.productName}
                    storeName={ordersList.storeName}
                    orderDate={ordersList.orderDate}
                    orderQuantity={ordersList.orderQty}   
                    totalDue={ordersList.lineTotal}
                    shipDate={ordersList.shipDate}
                />
            </Link>
        );
    });








    const selectedLayout = tabSelected === 2 ? listValuesVendors : listValuesOrders;

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