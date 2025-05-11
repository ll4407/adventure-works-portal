import { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import CustomerModal from "../../components/Sale/CustomerModal";
import StoreModal from "../../components/Sale/StoreModal";
import Loading from "../../components/utils/Loading"; // Import the spinner
import styles from "./Sale.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import PageContext from "../../context/PageContext";
import usePageContext from "../../hooks/usePageContext";
import ChevronDown from "../../icons/ChevronDown";

export default function Sale() {
  const pageContext = usePageContext("Customers");
  const { activePage, filter } = pageContext;
  const isCustomer = activePage === "Customers";

  const [sales, setSales] = useState(null); // Initialize as null
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Clear selected sale when switching between Customers and Stores
  useEffect(() => {
    setSelectedSaleId(null);
  }, [activePage]);

  // Fetch sales data
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
    axios
      .get(endpoint)
      .then(({ data }) => setSales(data))
      .catch((err) => toast.error(err.toString()))
      .finally(() => setLoading(false)); // Set loading to false after fetching
  }, [isCustomer]);

  // Filter sales based on the filter input
  useEffect(() => {
    let timer;
    if (filter) {
      timer = setTimeout(() => {
        const loweredFilter = filter.toLowerCase();
        const newFilteredSales = sales?.filter((sale) =>
          isCustomer
            ? sale.firstName.toLowerCase().includes(loweredFilter) ||
              sale.lastName.toLowerCase().includes(loweredFilter) ||
              sale.orderNumber.toString().includes(loweredFilter)
            : sale.storeName.toLowerCase().includes(loweredFilter) ||
              sale.contactFirstName.toLowerCase().includes(loweredFilter) ||
              sale.contactLastName.toLowerCase().includes(loweredFilter)
        );
        setFilteredSales(newFilteredSales || []);
      }, 500);
    } else {
      setFilteredSales(sales || []);
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
        {loading ? ( // Show spinner while loading
          <Loading />
        ) : selectedSaleId ? (
          <>
            <button className={styles.backButton} onClick={closeModal}>
              <ChevronDown className={styles.chevron} />Back
            </button>
            {isCustomer ? (
              <CustomerModal
                selectedSaleId={selectedSaleId}
                onClose={closeModal}
              />
            ) : (
              <StoreModal
                selectedSaleId={selectedSaleId}
                onClose={closeModal}
              />
            )}
          </>
        ) : (
          <>
            <div className={styles.headerRow}>
              {isCustomer ? (
                <>
                  <span>Customer</span>
                  <span>Order Date</span>
                  <span>Order Number</span>
                  <span>Order Qty</span>
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
          </>
        )}
      </div>
    </PageContext.Provider>
  );
}