import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import styles from "./CustomerModal.module.css";
import { Close } from "../../icons";

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
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <Close className={styles.close} />
        </button>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && customerDetails && (
          <>
            <header className={styles.header}>
              <h2>{`${customerDetails.suffix || ""} ${
                customerDetails.firstName || "N/A"
              } ${customerDetails.middleName || ""} ${
                customerDetails.lastName || "N/A"
              }`}</h2>
              <p className={styles.orderDate}>
                {customerDetails.orderDate
                  ? new Date(customerDetails.orderDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className={styles.orderNumber}>
                {customerDetails.orderNumber || "N/A"}
              </p>
            </header>

            <div className={styles.detailsGrid}>
              {/* Customer Information */}
              <section className={styles.customerDetails}>
                <h3>Customer Information</h3>
                <div className={styles.row}>
                  <p>
                    {`${customerDetails.suffix || ""} ${
                      customerDetails.firstName || "N/A"
                    } ${customerDetails.middleName || ""} ${
                      customerDetails.lastName || "N/A"
                    }`}
                  </p>
                </div>
                <div className={styles.row}>
                  <p>{customerDetails.title || "N/A"}</p>
                </div>
                <div className={styles.row}>
                  <p>
                    {customerDetails.phoneNumberType
                      ? `${customerDetails.phoneNumberType}: ${customerDetails.phoneNumber}`
                      : "N/A"}
                  </p>
                </div>
                <div className={styles.row}>
                  <p>Email: {customerDetails.emailAddress || "N/A"}</p>
                </div>
              </section>

              {/* Sale Details */}
              <section className={styles.saleDetails}>
                <h3>Sale Details</h3>
                <div className={styles.row}>
                  <span className={styles.label}>Order Number:</span>
                  <span className={styles.value}>
                    {customerDetails.orderNumber || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Tracking Number:</span>
                  <span className={styles.value}>
                    {customerDetails.carrierTrackingNumber || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Product Name:</span>
                  <span className={styles.value}>
                    {customerDetails.productName || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Product ID:</span>
                  <span className={styles.value}>
                    {customerDetails.productId || "N/A"}
                  </span>
                </div>
              </section>

              {/* Pricing Details */}
              <section className={styles.pricingDetails}>
                <h3>Pricing Details</h3>
                <div className={styles.row}>
                  <span className={styles.label}>Unit Price:</span>
                  <span className={styles.value}>
                    {customerDetails.unitPrice
                      ? customerDetails.unitPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Unit Price Discount:</span>
                  <span className={styles.value}>
                    {customerDetails.unitPriceDiscount
                      ? customerDetails.unitPriceDiscount.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Line Total:</span>
                  <span className={styles.value}>
                    {customerDetails.lineTotal
                      ? customerDetails.lineTotal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Order Quantity:</span>
                  <span className={styles.value}>
                    {customerDetails.orderQty || "N/A"}
                  </span>
                </div>
                <div className={`${styles.row} ${styles.taxAmount}`}>
                  <span className={styles.label}>Tax Amount:</span>
                  <span className={styles.value}>
                    {customerDetails.taxAmt
                      ? customerDetails.taxAmt.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Total Due:</span>
                  <span className={styles.value}>
                    {customerDetails.lineTotal &&
                    customerDetails.taxAmt &&
                    customerDetails.freight
                      ? (
                          customerDetails.lineTotal +
                          customerDetails.taxAmt +
                          customerDetails.freight
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
              </section>

              {/* Shipping Information */}
              <section className={styles.shipping}>
                <h3>Shipping Information</h3>
                <div className={styles.row}>
                  <span className={styles.label}>Ship Date:</span>
                  <span className={styles.value}>
                    {customerDetails.shipDate
                      ? new Date(
                          customerDetails.shipDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Method:</span>
                  <span className={styles.value}>
                    {customerDetails.shipMethodName || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Freight Number:</span>
                  <span className={styles.value}>
                    {customerDetails.freightNumber || "N/A"}
                  </span>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}