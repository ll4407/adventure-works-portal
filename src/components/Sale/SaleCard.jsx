import { useCallback } from "react";
import styles from "./SaleCard.module.css";
import ChevronDown from "../../icons/ChevronDown";

export default function SaleCard({ type, data, onClick }) {
  const handleClick = useCallback(() => onClick(data.id), [onClick, data.id]);

  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "");
  const fmtMoney = (x) =>
    x != null
      ? x.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "";

  return (
    <div className={styles.card}>
      {type === "customer" ? (
        <>
          {data.firstName && data.lastName && (
            <span className={styles.first}>{`${data.firstName} ${data.lastName}`}</span>
          )}
          {data.orderDate && (
            <span className={styles.second}>{fmtDate(data.orderDate)}</span>
          )}
          {data.orderNumber && (
            <span className={`${styles.hidden} ${styles.third}`}>{data.orderNumber}</span>
          )}
          {data.orderQty && (
            <span className={`${styles.hidden} ${styles.fourth}`}>{data.orderQty}</span>
          )}
          {data.shipDate && (
            <span className={`${styles.hidden} ${styles.fifth}`}>{fmtDate(data.shipDate)}</span>
          )}
          {data.unitPrice != null && (
            <span className={`${styles.hidden} ${styles.sixth}`}>{fmtMoney(data.unitPrice)}</span>
          )}
          {data.lineTotal != null && (
            <span className={`${styles.hidden} ${styles.seventh}`}>{fmtMoney(data.lineTotal)}</span>
          )}
          <ChevronDown size={42} className={styles.chevron} onClick={handleClick}/>
        </>
      ) : (
        <>
          {data.storeName && (
            <span className={styles.first}>{data.storeName}</span>
          )}
          {data.orderDate && (
            <span className={styles.second}>{fmtDate(data.orderDate)}</span>
          )}
          {data.contactName && (
            <span className={`${styles.hidden} ${styles.third}`}>{data.contactName}</span>
          )}
          {data.orderNumber && (
            <span className={`${styles.hidden} ${styles.fourth}`}>{data.orderNumber}</span>
          )}
          {data.productName && (
            <span className={`${styles.hidden} ${styles.fifth}`}>{data.productName}</span>
          )}
          {data.unitPrice != null && (
            <span className={`${styles.hidden} ${styles.sixth}`}>{fmtMoney(data.unitPrice)}</span>
          )}
          {data.lineTotal != null && (
            <span className={`${styles.hidden} ${styles.seventh}`}>{fmtMoney(data.lineTotal)}</span>
          )}
          <ChevronDown size={42} className={styles.chevron} onClick={handleClick}/>
        </>
      )}
    </div>
  );
}
