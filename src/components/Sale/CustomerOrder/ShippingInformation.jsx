import React from "react";
import styles from "../Customer.module.css";

export default function ShippingInformation({ details }) {
  return (
    <section className={styles.shipping}>
      <h3>Shipping Information</h3>
      <div className={styles.row}>
        <span className={styles.label}>Ship Date:</span>
        <span className={styles.value}>
          {details.shipDate
            ? new Date(details.shipDate).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Method:</span>
        <span className={styles.value}>{details.shipMethodName || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Freight Number:</span>
        <span className={styles.value}>{details.freightNumber || "N/A"}</span>
      </div>
    </section>
  );
}