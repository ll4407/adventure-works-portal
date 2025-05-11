import { useCallback } from "react";
import styles from "./SaleCard.module.css";
import ChevronDown from "../../icons/ChevronDown";

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
  onClick,
}) {
  const handleClick = useCallback(() => onClick(id), [onClick, id]);

  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");
  const fmtMoney = (x) =>
    x != null
      ? x.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "—";

  const isCustomer = lastName != null;

  return (
    <div className={styles.card} onClick={handleClick}>
      {isCustomer ? (
        <>
          <span className={styles.primary}>{`${firstName} ${lastName}`}</span>
          <span className={styles.secondary}>{fmtDate(orderDate)}</span>
          <span className={styles.hidden}>{orderNumber}</span>
          <span className={styles.hidden}>{orderQty}</span>
          <span className={styles.hidden}>{fmtDate(shipDate)}</span>
          <span className={styles.hidden}>{fmtMoney(unitPrice)}</span>
          <span className={styles.hidden}>{fmtMoney(lineTotal)}</span>
          <ChevronDown className={styles.chevron} />
        </>
      ) : (
        <>
          <span className={styles.primary}>{businessName}</span>
          <span className={styles.secondary}>{fmtDate(orderDate)}</span>
          <span className={styles.hidden}>{contactName}</span>
          <span className={styles.hidden}>{orderNumber}</span>
          <span className={styles.hidden}>{productName}</span>
          <span className={styles.hidden}>{fmtMoney(unitPrice)}</span>
          <span className={styles.hidden}>{fmtMoney(lineTotal)}</span>
          <ChevronDown className={styles.chevron} />
        </>
      )}
    </div>
  );
}
