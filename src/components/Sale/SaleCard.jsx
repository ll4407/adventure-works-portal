// import { useCallback } from "react";
// import styles from "./SaleCard.module.css";
// import ChevronDown from "../../icons/ChevronDown";

// export default function SaleCard({
//   id,
//   firstName,
//   lastName,
//   businessName,
//   contactName,
//   orderDate,
//   orderNumber,
//   orderQty,
//   shipDate,
//   productName,
//   unitPrice,
//   lineTotal,
//   onClick,
// }) {
//   const handleClick = useCallback(() => onClick(id), [onClick, id]);

//   const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");
//   const fmtMoney = (x) =>
//     x != null
//       ? x.toLocaleString("en-US", { style: "currency", currency: "USD" })
//       : "—";

//   const isCustomer = lastName != null;

//   return (
//     <div className={styles.card} onClick={handleClick}>
//       {isCustomer ? (
//         <>
//           <span className={styles.primary}>{`${firstName} ${lastName}`}</span>
//           <span className={styles.secondary}>{fmtDate(orderDate)}</span>
//           <span className={styles.hidden}>{orderNumber}</span>
//           <span className={styles.hidden}>{orderQty}</span>
//           <span className={styles.hidden}>{fmtDate(shipDate)}</span>
//           <span className={styles.hidden}>{fmtMoney(unitPrice)}</span>
//           <span className={styles.hidden}>{fmtMoney(lineTotal)}</span>
//           <ChevronDown className={styles.chevron} />
//         </>
//       ) : (
//         <>
//           <span className={styles.primary}>{businessName}</span>
//           <span className={styles.secondary}>{fmtDate(orderDate)}</span>
//           <span className={styles.hidden}>{contactName}</span>
//           <span className={styles.hidden}>{orderNumber}</span>
//           <span className={styles.hidden}>{productName}</span>
//           <span className={styles.hidden}>{fmtMoney(unitPrice)}</span>
//           <span className={styles.hidden}>{fmtMoney(lineTotal)}</span>
//           <ChevronDown className={styles.chevron} />
//         </>
//       )}
//     </div>
//   );
// }
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
    <div className={styles.card} onClick={handleClick}>
      {type === "customer" ? (
        <>
          {data.firstName && data.lastName && (
            <span className={styles.primary}>{`${data.firstName} ${data.lastName}`}</span>
          )}
          {data.orderDate && (
            <span className={styles.secondary}>{fmtDate(data.orderDate)}</span>
          )}
          {data.orderNumber && (
            <span className={styles.hidden}>{data.orderNumber}</span>
          )}
          {data.orderQty && (
            <span className={styles.hidden}>{data.orderQty}</span>
          )}
          {data.shipDate && (
            <span className={styles.hidden}>{fmtDate(data.shipDate)}</span>
          )}
          {data.unitPrice != null && (
            <span className={styles.hidden}>{fmtMoney(data.unitPrice)}</span>
          )}
          {data.lineTotal != null && (
            <span className={styles.hidden}>{fmtMoney(data.lineTotal)}</span>
          )}
          <ChevronDown className={styles.chevron} />
        </>
      ) : (
        <>
          {data.storeName && (
            <span className={styles.primary}>{data.storeName}</span>
          )}
          {data.orderDate && (
            <span className={styles.secondary}>{fmtDate(data.orderDate)}</span>
          )}
          {data.contactName && (
            <span className={styles.hidden}>{data.contactName}</span>
          )}
          {data.orderNumber && (
            <span className={styles.hidden}>{data.orderNumber}</span>
          )}
          {data.productName && (
            <span className={styles.hidden}>{data.productName}</span>
          )}
          {data.unitPrice != null && (
            <span className={styles.hidden}>{fmtMoney(data.unitPrice)}</span>
          )}
          {data.lineTotal != null && (
            <span className={styles.hidden}>{fmtMoney(data.lineTotal)}</span>
          )}
          <ChevronDown className={styles.chevron} />
        </>
      )}
    </div>
  );
}