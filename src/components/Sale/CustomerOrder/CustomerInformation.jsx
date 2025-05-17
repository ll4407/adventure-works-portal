import React from "react";
import styles from "../Customer.module.css";

export default function CustomerInformation({ details }) {
  return (
    <section className={styles.customerDetails}>
      <h3>Customer Information</h3>
      <div className={styles.row}>
        <p>
          {`${details.suffix || ""} ${details.firstName || "N/A"} ${details.middleName || ""} ${details.lastName || "N/A"}`}
        </p>
      </div>
      {/* <div className={styles.row}>
        <p>{details.title || "N/A"}</p>
      </div> */}
      <div className={styles.row}>
        <p>
          {details.phoneNumberType
            ? `${details.phoneNumberType}: ${details.phoneNumber}`
            : "N/A"}
        </p>
      </div>
      <div className={styles.row}>
        <p>Email: {details.emailAddress || "N/A"}</p>
      </div>
    </section>
  );
}