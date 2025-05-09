import { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import CustomerModal from "../../components/Sale/CustomerModal";
import StoreModal from "../../components/Sale/StoreModal";
import styles from "./Sale.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";

export default function Sale() {
  const pageContext = usePageContext("Customers");
  const { activePage, filter } = pageContext;
  const isCustomer = activePage === "Customers";

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  useEffect(() => {
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
    axios
      .get(endpoint)
      .then(({ data }) => setSales(data))
      .catch((err) => toast.error(err.toString()));
  }, [isCustomer]);

  useEffect(() => {
    let timer;
    if (filter) {
      timer = setTimeout(() => {
        const loweredFilter = filter.toLowerCase();
        const newFilteredSales = sales.filter((sale) =>
          isCustomer
            ? sale.firstName.toLowerCase().includes(loweredFilter) ||
              sale.lastName.toLowerCase().includes(loweredFilter) ||
              sale.orderNumber.toString().includes(loweredFilter)
            : sale.storeName.toLowerCase().includes(loweredFilter) ||
              sale.contactFirstName.toLowerCase().includes(loweredFilter) ||
              sale.contactLastName.toLowerCase().includes(loweredFilter)
        );
        setFilteredSales(newFilteredSales);
      }, 500);
    } else {
      setFilteredSales(sales);
    }

    return () => clearTimeout(timer);
  }, [filter, sales, isCustomer]);

  const onCardClick = useCallback(
    (id) => {
      setSelectedSaleId(id);
    },
    []
  );

  const closeModal = useCallback(() => setSelectedSaleId(null), []);

  return (
    <PageContext.Provider value={pageContext}>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
      />

      <div className={styles.container}>
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

        <div className={styles.list}>
          {filteredSales.map((o) => (
            <SaleCard
              key={o.id}
              {...(isCustomer
                ? {
                    id: o.id,
                    firstName: o.firstName,
                    lastName: o.lastName,
                    orderDate: o.orderDate,
                    orderNumber: o.orderNumber,
                    orderQty: o.orderQty,
                    shipDate: o.shipDate,
                  }
                : {
                    id: o.id,
                    businessName: o.storeName,
                    contactName: `${o.contactFirstName} ${o.contactLastName}`,
                    orderDate: o.orderDate,
                    orderNumber: o.orderNumber,
                    productName: o.productName,
                  })}
              unitPrice={o.unitPrice}
              lineTotal={o.lineTotal}
              onClick={() => onCardClick(o.id)}
            />
          ))}
        </div>

        {isCustomer ? (
        <CustomerModal selectedSaleId={selectedSaleId} onClose={closeModal} />
      ) : (
        <StoreModal selectedSaleId={selectedSaleId} onClose={closeModal} />
      )}
      </div>
    </PageContext.Provider>
  );
}