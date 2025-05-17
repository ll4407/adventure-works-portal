import React from "react";
import styles from "../Customer.module.css";

export default function CustomerHeader({ customerDetails }) {
  return (
    <header className={styles.header}>
      <h2>{`${customerDetails.suffix || ""} ${customerDetails.firstName || "N/A"} ${customerDetails.middleName || ""} ${customerDetails.lastName || "N/A"}`}</h2>
      <p className={styles.orderDate}>
        {customerDetails.orderDate
          ? new Date(customerDetails.orderDate).toLocaleDateString()
          : "N/A"}
      </p>
      <p className={styles.orderNumber}>
        {customerDetails.orderNumber || "N/A"}
      </p>
    </header>
  );
}