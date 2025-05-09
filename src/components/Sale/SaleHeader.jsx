import styles from "../../container/Sale/Sale.module.css";

function SaleHeader({ isCustomer }) {
    return (
      <div className={styles.headerRow}>
        {isCustomer ? (
          <>
            <span>Customer</span>
            <span>Order Date</span>
            <span>Order #</span>
            <span>Qty</span>
            <span>Ship Date</span>
            <span>Unit Price</span>
            <span>Total Due</span>
            <span />
          </>
        ) : (
          <>
            <span>Store/Business</span>
            <span>Order Date</span>
            <span>Contact Name</span>
            <span>Order Number</span>
            <span>Product Name</span>
            <span>Unit Price</span>
            <span>Total Due</span>
            <span />
          </>
        )}
      </div>
    );
  }

export default SaleHeader;