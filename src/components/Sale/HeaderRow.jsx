import React from "react";
import styles from "../../container/Sale/Sales.module.css"; 
const HeaderRow = ({ isCustomer, handleSort }) => (
    <div className={styles.headerRow}>
      {isCustomer ? (
        <>
          <button aria-label="Sort by customer last name" onClick={() => {handleSort("lastName", "name"); }}>Customer&#x25BE;</button>
          <button aria-label="Sort by order date" onClick={() => {handleSort("orderDate", "date"); }}>Order Date&#x25BE;</button>
          <button aria-label="Sort by order number" onClick={() => {handleSort("orderNumber", ""); }}>Order Number&#x25BE;</button>
          <button aria-label="Sort by order quantity" onClick={() => {handleSort("orderQty", ""); }}>Order Qty&#x25BE;</button>
          <button aria-label="Sort by ship date" onClick={() => {handleSort("shipDate", "date"); }}>Ship Date&#x25BE;</button>
          <button aria-label="Sort by unit price" onClick={() => {handleSort("unitPrice", ""); }}>Unit Price&#x25BE;</button>
          <button aria-label="Sort by total due" onClick={() => {handleSort("lineTotal", ""); }}>Total Due&#x25BE;</button>
          <span />
        </>
      ) : (
        <>
          <button aria-label="Sort by store/business" onClick={() => {handleSort("storeName", "name"); }}>Store/Business&#x25BE;</button>
          <button aria-label="Sort by order date" onClick={() => {handleSort("orderDate", "date"); }}>Order Date&#x25BE;</button>
          <button aria-label="Sort by contact name" onClick={() => {handleSort("contactLastName", "name"); }}>Contact Name&#x25BE;</button>
          <button aria-label="Sort by order number" onClick={() => {handleSort("orderNumber", ""); }}>Order Number&#x25BE;</button>
          <button aria-label="Sort by product number" onClick={() => {handleSort("productName", "name"); }}>Product Name&#x25BE;</button>
          <button aria-label="Sort by unit price" onClick={() => {handleSort("unitPrice", ""); }}>Unit Price&#x25BE;</button>
          <button aria-label="Sort by total due" onClick={() => {handleSort("lineTotal", ""); }}>Total Due&#x25BE;</button>
          <span />
        </>
      )}
    </div>
  );

  export default HeaderRow;