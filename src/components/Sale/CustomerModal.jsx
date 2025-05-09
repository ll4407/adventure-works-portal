import React from "react";
import styles from "./CustomerModal.module.css";

export default function CustomerModal({ isCustomer, selectedSale, onClose }) {
  if (!selectedSale) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <h2>{isCustomer ? "Customer Details" : "Store Details"}</h2>
        <dl>
          {isCustomer ? (
            <>
              <dt>Name</dt>
              <dd>{`${selectedSale.firstName} ${selectedSale.lastName}`}</dd>
              <dt>Order #</dt>
              <dd>{selectedSale.orderNumber}</dd>
              <dt>Qty</dt>
              <dd>{selectedSale.orderQty}</dd>
              <dt>Ship Date</dt>
              <dd>{new Date(selectedSale.shipDate).toLocaleDateString()}</dd>
            </>
          ) : (
            <>
              <dt>Business</dt>
              <dd>{selectedSale.storeName}</dd>
              <dt>Contact</dt>
              <dd>{`${selectedSale.contactFirstName} ${selectedSale.contactLastName}`}</dd>
              <dt>Product</dt>
              <dd>{selectedSale.productName}</dd>
            </>
          )}
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