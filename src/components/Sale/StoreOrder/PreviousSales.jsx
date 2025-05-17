import React from "react";
import styles from "../Store.module.css";

export default function PreviousSales({ previousOrders }) {
  return (
    <section className={styles.previousSales}>
      <h3>Previous Sales</h3>
      {previousOrders?.length > 0 ? (
        <div className={styles.previousSalesTable}>
          <div className={styles.previousSalesHeader}>
            <span className={styles.orderDateHeader}>Order Date</span>
            <span className={styles.totalPaidHeader}>Total Paid</span>
          </div>
          {previousOrders.map((order, index) => (
            <div key={index} className={styles.previousSalesRow}>
              <span className={styles.orderDate}>
                {new Date(order.orderDate).toLocaleDateString()}
              </span>
              <span className={styles.totalPaid}>
                {order.totalDue?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>No previous sales available.</p>
      )}
    </section>
  );
}