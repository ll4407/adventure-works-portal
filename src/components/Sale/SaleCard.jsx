import { useCallback } from "react";
import styles from "./SaleCard.module.css";

export default function SaleCard({
  id,
  firstName,
  lastName,
  orderDate,
  orderNumber,
  orderQty,
  unitPrice,
  lineTotal,
  onClick
}) {
  const handleClick = useCallback(() => onClick(id), [onClick, id]);

  const fmtDate = d => new Date(d).toLocaleDateString();
  const fmtMoney = x =>
    x != null
      ? x.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "—";

  return (
    <div className={styles.card} onClick={handleClick}>
      <span>{`${firstName} ${lastName}`}</span>
      <span>{fmtDate(orderDate)}</span>
      <span>{orderNumber}</span>
      <span>{orderQty}</span>
      <span>{fmtDate(orderDate)}</span>
      <span>{fmtMoney(unitPrice)}</span>
      <span>{fmtMoney(lineTotal)}</span>
      <span className={styles.arrow}>›</span>
    </div>
  );
}
