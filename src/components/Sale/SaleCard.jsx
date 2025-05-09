// src/components/Sale/SaleCard.jsx
import { useCallback } from "react";
import styles from "./SaleCard.module.css";

export default function SaleCard({
  id,
  firstName,
  lastName,
  businessName,
  contactName,
  orderDate,
  orderNumber,
  orderQty,
  shipDate,
  productName,
  unitPrice,
  lineTotal,
  onClick
}) {
  const handleClick = useCallback(() => onClick(id), [onClick, id]);

  const fmtDate = d => d ? new Date(d).toLocaleDateString() : '—';
  const fmtMoney = x =>
    x != null
      ? x.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "—";

  const isStore = businessName != null;

  return (
    <div className={styles.card} onClick={handleClick}>
      {isStore ? (
        <>
          <span>{businessName}</span>
          <span>{fmtDate(orderDate)}</span>
          <span>{contactName}</span>
          <span>{orderNumber}</span>
          <span>{productName}</span>
          <span>{fmtMoney(unitPrice)}</span>
          <span>{fmtMoney(lineTotal)}</span>
          <span className={styles.arrow}>›</span>
        </>
      ) : (
        <>
          <span>{`${firstName} ${lastName}`}</span>
          <span>{fmtDate(orderDate)}</span>
          <span>{orderNumber}</span>
          <span>{orderQty}</span>
          <span>{fmtDate(shipDate)}</span>
          <span>{fmtMoney(unitPrice)}</span>
          <span>{fmtMoney(lineTotal)}</span>
          <span className={styles.arrow}>›</span>
        </>
      )}
    </div>
  );
}
