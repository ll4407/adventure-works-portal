import React from "react";
import styles from "../../container/Sale/Sales.module.css"; 
const HeaderRow = ({ isCustomer, handleSort }) => (
    <div className={styles.headerRow}>
      {isCustomer ? (
        <>
          <span onClick={() => {handleSort("lastName", "name"); }}>Customer&#x25BE;</span>
          <span onClick={() => {handleSort("orderDate", "date"); }}>Order Date&#x25BE;</span>
          <span onClick={() => {handleSort("orderNumber", ""); }}>Order Number&#x25BE;</span>
          <span onClick={() => {handleSort("orderQty", ""); }}>Order Qty&#x25BE;</span>
          <span onClick={() => {handleSort("shipDate", "date"); }}>Ship Date&#x25BE;</span>
          <span onClick={() => {handleSort("unitPrice", ""); }}>Unit Price&#x25BE;</span>
          <span onClick={() => {handleSort("lineTotal", ""); }}>Total Due&#x25BE;</span>
          <span />
        </>
      ) : (
        <>
          <span onClick={() => {handleSort("storeName", "name"); }}>Store/Business&#x25BE;</span>
          <span onClick={() => {handleSort("orderDate", "date"); }}>Order Date&#x25BE;</span>
          <span onClick={() => {handleSort("contactLastName", "name"); }}>Contact Name&#x25BE;</span>
          <span onClick={() => {handleSort("orderNumber", ""); }}>Order Number&#x25BE;</span>
          <span onClick={() => {handleSort("productName", "name"); }}>Product Name&#x25BE;</span>
          <span onClick={() => {handleSort("unitPrice", ""); }}>Unit Price&#x25BE;</span>
          <span onClick={() => {handleSort("lineTotal", ""); }}>Total Due&#x25BE;</span>
          <span />
        </>
      )}
    </div>
  );

  export default HeaderRow;