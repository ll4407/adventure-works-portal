import React from "react";
import styles from "./StoreModal.module.css";

export default function StoreModal({ selectedSale, onClose }) {
  if (!selectedSale) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <h2>Store Details</h2>
        <dl>
          <dt>Business</dt>
          <dd>{selectedSale.storeName}</dd>
          <dt>Contact</dt>
          <dd>{`${selectedSale.contactFirstName} ${selectedSale.contactLastName}`}</dd>
          <dt>Product</dt>
          <dd>{selectedSale.productName}</dd>
          <dt>Order #</dt>
          <dd>{selectedSale.orderNumber}</dd>
          <dt>Order Date</dt>
          <dd>{new Date(selectedSale.orderDate).toLocaleDateString()}</dd>
          <dt>Unit Price</dt>
          <dd>
            {selectedSale.unitPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </dd>
          <dt>Total Due</dt>
          <dd>
            {selectedSale.lineTotal?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </dd>
        </dl>
      </div>
    </div>
  );
}