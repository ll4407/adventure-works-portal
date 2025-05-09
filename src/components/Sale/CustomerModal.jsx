import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./CustomerModal.module.css";

export default function CustomerModal({ selectedSaleId, onClose }) {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer details when the modal is opened
  useEffect(() => {
    if (!selectedSaleId) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/Order/customer/${selectedSaleId}`)
      .then((response) => {
        setCustomerDetails(response.data);
      })
      .catch((err) => {
        setError("Failed to load customer details.");
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
        <h2>Customer Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {customerDetails && (
          <dl>
            <dt>Name</dt>
            <dd>{`${customerDetails.firstName} ${customerDetails.lastName}`}</dd>
            <dt>Phone</dt>
            <dd>{`${customerDetails.phoneNumber} (${customerDetails.phoneNumberType})`}</dd>
            <dt>Email</dt>
            <dd>{customerDetails.emailAddress}</dd>
            <dt>Order #</dt>
            <dd>{customerDetails.orderNumber}</dd>
            <dt>Order Date</dt>
            <dd>{new Date(customerDetails.orderDate).toLocaleDateString()}</dd>
            <dt>Ship Date</dt>
            <dd>{new Date(customerDetails.shipDate).toLocaleDateString()}</dd>
            <dt>Ship Method</dt>
            <dd>{customerDetails.shipMethodName}</dd>
            <dt>Freight</dt>
            <dd>
              {customerDetails.freight?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
            <dt>Tax Amount</dt>
            <dd>
              {customerDetails.taxAmt?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
            <dt>Product</dt>
            <dd>{customerDetails.productName}</dd>
            <dt>Order Qty</dt>
            <dd>{customerDetails.orderQty}</dd>
            <dt>Unit Price</dt>
            <dd>
              {customerDetails.unitPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
            <dt>Line Total</dt>
            <dd>
              {customerDetails.lineTotal?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
          </dl>
        )}
      </div>
    </div>
  );
}