import React from "react";
import styles from "../Customer.module.css";

export default function PricingDetails({ details }) {
  return (
    <section className={styles.pricingDetails}>
      <h3>Pricing Details</h3>
      <div className={styles.row}>
        <span className={styles.label}>Unit Price:</span>
        <span className={styles.value}>
          {details.unitPrice
            ? details.unitPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Unit Price Discount:</span>
        <span className={styles.value}>
          {details.unitPriceDiscount
            ? details.unitPriceDiscount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Line Total:</span>
        <span className={styles.value}>
          {details.lineTotal
            ? details.lineTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Order Quantity:</span>
        <span className={styles.value}>{details.orderQty || "N/A"}</span>
      </div>
      <div className={`${styles.row} ${styles.taxAmount}`}>
        <span className={styles.label}>Tax Amount:</span>
        <span className={styles.value}>
          {details.taxAmt
            ? details.taxAmt.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Total Due:</span>
        <span className={styles.value}>
          {details.lineTotal && details.taxAmt && details.freight
            ? (
                details.lineTotal +
                details.taxAmt +
                details.freight
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
    </section>
  );
}