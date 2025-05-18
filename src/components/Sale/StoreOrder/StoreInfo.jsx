import React from "react";
import styles from "../Store.module.css";

export default function StoreInfo({ details }) {
  return (
    <section className={styles.storeInfo}>
      <h3>Store Information</h3>
      <div className={styles.row}>
        <span className={styles.label}>Annual Sales</span>
        <span className={styles.value}>
          {details.annualSales
            ? details.annualSales.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Bank</span>
        <span className={styles.value}>{details.bankName || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Square Footage</span>
        <span className={styles.value}>{details.squareFeet || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Specialty</span>
        <span className={styles.value}>{details.specialty || "N/A"}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Total Employees</span>
        <span className={styles.value}>{details.numberEmployees || "N/A"}</span>
      </div>
    </section>
  );
}