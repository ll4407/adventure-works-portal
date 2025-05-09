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
  const { activePage, filter } = pageContext; // Access filter from context
  const isCustomer = activePage === "Customers";

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]); // State for filtered sales
  const [selectedSale, setSelectedSale] = useState(null);

  // Fetch sales data on tab change
  useEffect(() => {
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
    axios
      .get(endpoint)
      .then(({ data }) => setSales(data))
      .catch((err) => toast.error(err.toString()));
  }, [isCustomer]);

  // Filter sales data based on the filter value
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
      }, 500); // Debounce for 500ms
    } else {
      setFilteredSales(sales); // Show all sales if no filter is applied
    }

    return () => clearTimeout(timer); // Cleanup debounce timer
  }, [filter, sales, isCustomer]);

  // Open modal with sale details
  const onCardClick = useCallback(
    (id) => {
      const sale = sales.find((s) => s.id === id);
      setSelectedSale(sale);
    },
    [sales]
  );

  // Close modal
  const closeModal = useCallback(() => setSelectedSale(null), []);

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
              onClick={onCardClick}
            />
          ))}
        </div>

        {/* Use CustomerModal or StoreModal based on isCustomer */}
        {isCustomer ? (
          <CustomerModal
            isCustomer={isCustomer}
            selectedSale={selectedSale}
            onClose={closeModal}
          />
        ) : (
          <StoreModal selectedSale={selectedSale} onClose={closeModal} />
        )}
      </div>
    </PageContext.Provider>
  );
}