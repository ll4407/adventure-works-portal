import React from "react";
import styles from "../Store.module.css";

export default function StoreHeader({ storeDetails }) {
  return (
    <header className={styles.header}>
      <h2>{storeDetails.storeName || "N/A"}</h2>
      <p>
        {storeDetails.orderDate
          ? new Date(storeDetails.orderDate).toLocaleDateString()
          : "N/A"}
      </p>
      <p>{storeDetails.orderNumber || "N/A"}</p>
    </header>
  );
}