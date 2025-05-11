import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import Customer from "../../components/Sale/Customer";
import Store from "../../components/Sale/Store";
import HeaderRow from "../../components/Sale/HeaderRow";
import styles from "./Sales.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";
import ChevronDown from "../../icons/ChevronDown";
import Loading from "../../components/utils/Loading";

// Helper function for filtering sales
const filterSalesData = (sales, filter, isCustomer) => {
  if (!filter) return sales || [];
  const lowered = filter.toLowerCase();
  return sales.filter((sale) =>
    isCustomer
      ? sale.firstName?.toLowerCase().includes(lowered) ||
        sale.lastName?.toLowerCase().includes(lowered) ||
        sale.orderNumber?.toString().includes(lowered)
      : sale.storeName?.toLowerCase().includes(lowered) ||
        sale.contactFirstName?.toLowerCase().includes(lowered) ||
        sale.contactLastName?.toLowerCase().includes(lowered)
  );
};

export default function Sales() {
  const pageContext = usePageContext("Customers");
  const { activePage, filter } = pageContext;
  const isCustomer = activePage === "Customers";

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Callback to update sales state after a store or customer update
  const updateSalesAfterChange = useCallback((updatedSale) => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === updatedSale.id ? { ...sale, ...updatedSale } : sale
      )
    );
  }, []);

  // Fetch sales data
  const fetchSales = useCallback(() => {
    setLoading(true);
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
    axios
      .get(endpoint)
      .then(({ data }) => setSales(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch sales data.");
      })
      .finally(() => setLoading(false));
  }, [isCustomer]);

  // Initial fetch & re-fetch when tab changes
  useEffect(() => {
    setSelectedCustomerId(null);
    setSelectedStoreId(null);
    setSales([]);
    setFilteredSales([]);
    fetchSales();
  }, [activePage, fetchSales]);

  // Apply the search filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredSales(filterSalesData(sales, filter, isCustomer));
    }, 300);
    return () => clearTimeout(timer);
  }, [filter, sales, isCustomer]);

  // Handle clicking a card
  const onCardClick = useCallback((id) => {
    if (isCustomer) {
      setSelectedCustomerId(id);
      setSelectedStoreId(null);
    } else {
      setSelectedStoreId(id);
      setSelectedCustomerId(null);
    }
  }, [isCustomer]);

  // Close detail & re-fetch list
  const closeDetail = useCallback(() => {
    if (isCustomer) {
      setSelectedCustomerId(null);
    } else {
      setSelectedStoreId(null);
    }
    fetchSales(); // Re-fetch sales data when closing detail
  }, [isCustomer, fetchSales]);

  return (
    <PageContext.Provider value={pageContext}>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
        onFirstButtonClick={() => pageContext.setActivePage("Customers")}
        onSecondButtonClick={() => pageContext.setActivePage("Stores")}
      />

      <div className={styles.container}>
        {loading && !selectedCustomerId && !selectedStoreId ? (
          <Loading />
        ) : selectedCustomerId || selectedStoreId ? (
          <>
            <button className={styles.backButton} onClick={closeDetail}>
              <ChevronDown className={styles.chevron} /> Back
            </button>
            {selectedCustomerId && isCustomer ? (
              <Customer
                selectedSaleId={selectedCustomerId}
                onClose={closeDetail}
                onUpdate={updateSalesAfterChange} // Pass the callback
              />
            ) : selectedStoreId && !isCustomer ? (
              <Store
                selectedSaleId={selectedStoreId}
                onClose={closeDetail}
                onUpdate={updateSalesAfterChange} // Pass the callback
              />
            ) : null}
          </>
        ) : (
          <>
            <HeaderRow isCustomer={isCustomer} />
            <div className={styles.list}>
              {filteredSales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  type={isCustomer ? "customer" : "store"}
                  data={{
                    ...sale,
                    contactName: `${sale.contactFirstName || ""} ${
                      sale.contactLastName || ""
                    }`.trim(),
                  }}
                  onClick={() => onCardClick(sale.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageContext.Provider>
  );
}