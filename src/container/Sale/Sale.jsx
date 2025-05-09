import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import styles from "./Sale.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";
import SaleHeader from "../../components/Sale/SaleHeader";

export default function Sale() {
  // Hook into context for tab state and search filter
  const pageContext = usePageContext("Customers");
  const { activePage, filter } = pageContext;

  const isCustomer = activePage === "Customers";
  const navigate = useNavigate();

  // Sales data and filtered subset
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);

  // Fetch on tab change
  useEffect(() => {
    setSales([]);
    setFilteredSales([]);
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";

    axios
      .get(endpoint)
      .then(({ data }) => {
        setSales(data);
        setFilteredSales(data);
      })
      .catch((err) => toast.error(err.toString()));
  }, [isCustomer]);

  // Update filtered list when filter or sales change
  useEffect(() => {
    if (!filter) {
      setFilteredSales(sales);
      return;
    }
    const timer = setTimeout(() => {
      const lower = filter.toLowerCase();
      const filtered = sales.filter((o) => {
        if (isCustomer) {
          // match first or last name or order number
          return (
            o.firstName.toLowerCase().includes(lower) ||
            o.lastName.toLowerCase().includes(lower) ||
            String(o.orderNumber).includes(lower)
          );
        } else {
          // match store name, contact, or product name
          const contact =
            `${o.contactFirstName} ${o.contactLastName}`.toLowerCase();
          return (
            o.storeName.toLowerCase().includes(lower) ||
            contact.includes(lower) ||
            o.productName.toLowerCase().includes(lower)
          );
        }
      });
      setFilteredSales(filtered);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, sales, isCustomer]);

  // Navigate on card click
  const onCardClick = useCallback((id) => navigate(`/sales/${id}`), [navigate]);

  return (
    <PageContext.Provider value={pageContext}>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
      />

      <div className={styles.container}>
        <SaleHeader isCustomer={isCustomer} />

        <div className={styles.list}>
          {filteredSales.map((o) =>
            isCustomer ? (
              <SaleCard
                key={o.id}
                id={o.id}
                firstName={o.firstName}
                lastName={o.lastName}
                orderDate={o.orderDate}
                orderNumber={o.orderNumber}
                orderQty={o.orderQty}
                shipDate={o.shipDate}
                unitPrice={o.unitPrice}
                lineTotal={o.lineTotal}
                onClick={onCardClick}
              />
            ) : (
              <SaleCard
                key={o.id}
                id={o.id}
                businessName={o.storeName}
                contactName={`${o.contactFirstName} ${o.contactLastName}`}
                orderDate={o.orderDate}
                orderNumber={o.orderNumber}
                productName={o.productName}
                unitPrice={o.unitPrice}
                lineTotal={o.lineTotal}
                onClick={onCardClick}
              />
            )
          )}
        </div>
      </div>
    </PageContext.Provider>
  );
}
