import React from "react";
import styles from "../Store.module.css";

export default function SaleDetails({ details }) {
  return (
    <section className={styles.saleDetails}>
      <h3>Sale Details</h3>
      <div className={styles.row}>
        <span className={styles.label}>Order Number</span>
        <span className={styles.value}>{details.orderNumber || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Tracking Number</span>
        <span className={styles.value}>{details.carrierTrackingNumber || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Order Quantity</span>
        <span className={styles.value}>{details.orderQty || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Product</span>
        <span className={styles.value}>{details.productName || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Product ID</span>
        <span className={styles.value}>{details.productId || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Unit Price</span>
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
        <span className={styles.label}>Unit Price Discount</span>
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
        <span className={styles.label}>Line Total</span>
        <span className={styles.value}>
          {details.lineTotal
            ? details.lineTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
    </section>
  );
}