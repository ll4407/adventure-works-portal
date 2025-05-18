import React from "react";
import styles from "../Customer.module.css";


export default function SaleDetails({ details }) {
  return (
    <section className={styles.saleDetails}>
      <h3>Sale Details</h3>
      <div className={styles.row}>
        <span className={styles.label}>Order Number:</span>
        <span className={styles.value}>{details.orderNumber || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Tracking Number:</span>
        <span className={styles.value}>{details.carrierTrackingNumber || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Product Name:</span>
        <span className={styles.value}>{details.productName || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Product ID:</span>
        <span className={styles.value}>{details.productId || "N/A"}</span>
      </div>
    </section>
  );
}