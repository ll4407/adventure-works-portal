import axios from '../../api/axios';
import { toast } from 'react-toastify';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";

import { Link, useParams } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Edit, ChevronDown } from '../../icons';


function OrderDetails() {
    const [ordersInfo, setOrder] = useState(null);
    
    const [activePage, setActivePage] = useState('Vendors');
    const [filter, setFilter] = useState("");

	const { id } = useParams();

    useEffect(() => {

            axios.get(`Purchase/${id}`)
            .then(resp => {
                setOrder(resp.data);

            })
            .catch(err => {
                toast.error(err);
            });
        

    }, [id]);

    const detailContent = ordersInfo === null ? <p>Loading</p> :
        <div>
            <section>
                <h2>Pricing Details</h2>

                <div>
                    <p>Unit Price</p>
                    <p>${ordersInfo.unitPrice}</p>
                </div>
                <div>
                    <p>Quantity</p>
                    <p>{ordersInfo.quantity}</p>
                </div>
                <div>
                    <p>Subtotal</p>
                    <p>${ordersInfo.lineTotal}</p>
                </div>
                <div>
                    <p>Shipping Cost</p>
                    <p>$50</p>
                </div>
                <div>
                    <p>Tax Amount</p>
                    <p>${ordersInfo.taxAmt}</p>
                </div>
                <div>
                    <p>Total Due</p>
                    <p>${ordersInfo.lineTotal + ordersInfo.taxAmt + 50}</p>
                </div>
            </section>

            <section>
                <h2>Order Details</h2>

                <div>
                    <p>Order ID</p>
                    <p>{ordersInfo.purchaseOrderId}</p>
                </div>
                <div>
                    <p>Order Date</p>
                    <p>{ordersInfo.orderDate}</p>
                </div>
                <div>
                    <p>Product ID</p>
                    <p>{ordersInfo.productId}</p>
                </div>
                <div>
                    <p>Product Name</p>
                    <p>{ordersInfo.productName}</p>
                </div>
                <div>
                    <p>Product Number</p>
                    <p>{ordersInfo.productNumber}</p>
                </div>
                <div>
                    <p>Line Total</p>
                    <p>{ordersInfo.lineTotal}</p>
                </div>
                <div>
                    <p>Qty Recieved</p>
                    <p>{ordersInfo.receivedQty}</p>
                </div>
                <div>
                    <p>Qty Rejected</p>
                    <p>{ordersInfo.rejectedQty}</p>
                </div>
                <div>
                    <p>Qty Stocked</p>
                    <p>{ordersInfo.stockedQty}</p>
                </div>           
            </section>

            <section>
                <h2>Shipping Details</h2>

                <div>
                    <p>Method</p>
                    <p>{ordersInfo.shipMethodName}</p>
                </div>
                <div>
                    <p>Ship Date</p>
                    <p>{ordersInfo.shipDate}</p>
                </div>
                <div>
                    <p>Frieght</p>
                    <p>{ordersInfo.freight}</p>
                </div>
                <div>
                    <p>Line Total</p>
                    <p>{ordersInfo.lineTotal}</p>
                </div>   
                <div>
                    <p>Qty Recieved</p>
                    <p>{ordersInfo.receivedQty}</p>
                </div>
                <div>
                    <p>Qty Rejected</p>
                    <p>{ordersInfo.rejectedQty}</p>
                </div>
                <div>
                    <p>Qty Stocked</p>
                    <p>{ordersInfo.stockedQty}</p>
                </div>   
            </section>

            <section>
                <h2>Vendor Details</h2>

                <div>
                    <p>Account Number</p>
                    <p>{ordersInfo.accountNumber}</p>
                </div>
                <div>
                    <p>Business Entity ID</p>
                    <p>{ordersInfo.vendorId}</p>
                </div>
                <div>
                    <p>Credit Rating</p>
                    <p>{ordersInfo.creditRating}</p>
                </div>  
            </section>
        </div>;


    const context = {
        activePage:activePage,
        setActivePage: setActivePage,
        filter: filter,
        setFilter:setFilter
    }

    return(
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


export default OrderDetails;