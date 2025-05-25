import React from "react";
import styles from "../../container/Sale/Sales.module.css"; 
const HeaderRow = ({ isCustomer, handleSort }) => (
    <div className={styles.headerRow}>
      {isCustomer ? (
        <>
          <span onClick={() => {handleSort("lastName", "name"); }}>Customer</span>
          <span onClick={() => {handleSort("orderDate", "date"); }}>Order Date</span>
          <span onClick={() => {handleSort("orderNumber", ""); }}>Order Number</span>
          <span onClick={() => {handleSort("orderQty", ""); }}>Order Qty</span>
          <span onClick={() => {handleSort("shipDate", "date"); }}>Ship Date</span>
          <span onClick={() => {handleSort("unitPrice", ""); }}>Unit Price</span>
          <span onClick={() => {handleSort("lineTotal", ""); }}>Total Due</span>
          <span />
        </>
      ) : (
        <>
          <span onClick={() => {handleSort("storeName", "name"); }}>Store/Business</span>
          <span onClick={() => {handleSort("orderDate", "date"); }}>Order Date</span>
          <span onClick={() => {handleSort("contactLastName", "name"); }}>Contact Name</span>
          <span onClick={() => {handleSort("orderNumber", ""); }}>Order Number</span>
          <span onClick={() => {handleSort("productName", "name"); }}>Product Name</span>
          <span onClick={() => {handleSort("unitPrice", ""); }}>Unit Price</span>
          <span onClick={() => {handleSort("lineTotal", ""); }}>Total Due</span>
          <span />
        </>
      )}
    </div>
  );

  export default HeaderRow;