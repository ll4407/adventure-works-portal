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
        <h2>{`${customerDetails?.firstName} ${customerDetails?.lastName}`}</h2>
        <p>
          <strong>Order Date:</strong> {new Date(customerDetails?.orderDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Order Number:</strong> {customerDetails?.orderNumber}
        </p>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {customerDetails && (
          <div className={styles.detailsGrid}>
            {/* Customer Information */}
            <div>
              <h3>Customer Information</h3>
              <p>
                <strong>Name:</strong> {`${customerDetails.suffix || ""} ${customerDetails.firstName} ${customerDetails.middleName || ""} ${customerDetails.lastName}`}
              </p>
              <p>
                <strong>Title:</strong> {customerDetails.title || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {`${customerDetails.phoneNumber} (${customerDetails.phoneNumberType})`}
              </p>
              <p>
                <strong>Email:</strong> {customerDetails.emailAddress}
              </p>
            </div>

            {/* Shipping Information */}
            <div>
              <h3>Shipping Information</h3>
              <p>
                <strong>Ship Date:</strong> {new Date(customerDetails.shipDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Method:</strong> {customerDetails.shipMethodName}
              </p>
              <p>
                <strong>Freight Number:</strong> {customerDetails.freightNumber || "N/A"}
              </p>
            </div>

            {/* Sale Details */}
            <div>
              <h3>Sale Details</h3>
              <p>
                <strong>Order Number:</strong> {customerDetails.orderNumber}
              </p>
              <p>
                <strong>Tracking Number:</strong> {customerDetails.carrierTrackingNumber || "N/A"}
              </p>
              <p>
                <strong>Product Name:</strong> {customerDetails.productName}
              </p>
              <p>
                <strong>Product ID:</strong> {customerDetails.productId}
              </p>
            </div>

            {/* Pricing Details */}
            <div>
              <h3>Pricing Details</h3>
              <p>
                <strong>Unit Price:</strong>{" "}
                {customerDetails.unitPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p>
                <strong>Unit Price Discount:</strong>{" "}
                {customerDetails.unitPriceDiscount?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p>
                <strong>Line Total:</strong>{" "}
                {customerDetails.lineTotal?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p>
                <strong>Order Quantity:</strong> {customerDetails.orderQty}
              </p>
              <p>
                <strong>Tax Amount:</strong>{" "}
                {customerDetails.taxAmt?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p>
                <strong>Total Due:</strong>{" "}
                {(
                  customerDetails.lineTotal +
                  customerDetails.taxAmt +
                  customerDetails.freight
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}