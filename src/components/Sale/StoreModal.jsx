import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./StoreModal.module.css";

export default function StoreModal({ selectedSaleId, onClose }) {
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch store details when the modal is opened
  useEffect(() => {
    if (!selectedSaleId) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/order/store/${selectedSaleId}`)
      .then((response) => {
        setStoreDetails(response.data);
      })
      .catch((err) => {
        setError("Failed to load store details.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSaleId]);

  if (!selectedSaleId) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <h2>Store Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {storeDetails && (
          <dl>
            <dt>Business</dt>
            <dd>{storeDetails.storeName}</dd>
            <dt>Annual Sales</dt>
            <dd>
              {storeDetails.annualSales?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
            <dt>Bank Name</dt>
            <dd>{storeDetails.bankName}</dd>
            <dt>Square Feet</dt>
            <dd>{storeDetails.squareFeet}</dd>
            <dt>Specialty</dt>
            <dd>{storeDetails.specialty}</dd>
            <dt>Number of Employees</dt>
            <dd>{storeDetails.numberEmployees}</dd>
            <dt>Order #</dt>
            <dd>{storeDetails.orderNumber}</dd>
            <dt>Order Date</dt>
            <dd>{new Date(storeDetails.orderDate).toLocaleDateString()}</dd>
            <dt>Ship Date</dt>
            <dd>{new Date(storeDetails.shipDate).toLocaleDateString()}</dd>
            <dt>Product</dt>
            <dd>{storeDetails.productName}</dd>
            <dt>Order Qty</dt>
            <dd>{storeDetails.orderQty}</dd>
            <dt>Unit Price</dt>
            <dd>
              {storeDetails.unitPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
            <dt>Line Total</dt>
            <dd>
              {storeDetails.lineTotal?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>

            <h3>Contacts</h3>
            {storeDetails.contacts.map((contact, index) => (
              <div key={index}>
                <dt>Contact Name</dt>
                <dd>{`${contact.firstName} ${contact.lastName}`}</dd>
                <dt>Phone</dt>
                <dd>{`${contact.phoneNumber} (${contact.phoneNumberType})`}</dd>
                <dt>Email</dt>
                <dd>{contact.emailAddress}</dd>
              </div>
            ))}

            <h3>Previous Orders</h3>
            {storeDetails.previousOrders.map((order, index) => (
              <div key={index}>
                <dt>Order Date</dt>
                <dd>{new Date(order.orderDate).toLocaleDateString()}</dd>
                <dt>Total Due</dt>
                <dd>
                  {order.totalDue?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}