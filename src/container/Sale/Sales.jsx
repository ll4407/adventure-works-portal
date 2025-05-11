
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";
// import SaleCard from "../../components/Sale/SaleCard";
// import Customer from "../../components/Sale/Customer";
// import Store from "../../components/Sale/Store";
// import Loading from "../../components/utils/Loading";
// import HeaderRow from "../../components/Sale/HeaderRow";
// import styles from "./Sales.module.css";
// import SectionHeader from "../../components/SectionHeader/SectionHeader";
// import PageContext from "../../context/PageContext";
// import usePageContext from "../../hooks/usePageContext";
// import ChevronDown from "../../icons/ChevronDown";

// // Helper function for filtering sales
// const filterSalesData = (sales, filter, isCustomer) => {
//   if (!filter) return sales || [];
//   const loweredFilter = filter.toLowerCase();
//   return sales?.filter((sale) =>
//     isCustomer
//       ? sale.firstName?.toLowerCase().includes(loweredFilter) ||
//         sale.lastName?.toLowerCase().includes(loweredFilter) ||
//         sale.orderNumber?.toString().includes(loweredFilter)
//       : sale.storeName?.toLowerCase().includes(loweredFilter) ||
//         sale.contactFirstName?.toLowerCase().includes(loweredFilter) ||
//         sale.contactLastName?.toLowerCase().includes(loweredFilter)
//   );
// };

// export default function Sales() {
//   const pageContext = usePageContext("Customers");
//   const { activePage, filter } = pageContext;
//   const isCustomer = activePage === "Customers";

//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [selectedSaleId, setSelectedSaleId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Clear selected sale when switching between Customers and Stores
//   useEffect(() => {
//     setSelectedSaleId(null);
//     setSales([]); // Clear sales to prevent stale data
//     setFilteredSales([]);
//   }, [activePage]);

//   // Fetch sales data
//   useEffect(() => {
//     setLoading(true);
//     const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
//     axios
//       .get(endpoint)
//       .then(({ data }) => {
//         setSales(data);
//       })
//       .catch((err) => toast.error(err.toString()))
//       .finally(() => setLoading(false));
//   }, [isCustomer]);

//   // Filter sales based on the filter input
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const filtered = filterSalesData(sales, filter, isCustomer);
//       setFilteredSales(filtered);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [filter, sales, isCustomer]);

//   const onCardClick = useCallback((id) => {
//     setSelectedSaleId(id);
//   }, []);

//   const closeModal = useCallback(() => setSelectedSaleId(null), []);

//   return (
//     <PageContext.Provider value={pageContext}>
//       <SectionHeader
//         title="Sales"
//         color="Pink"
//         firstButton="Customers"
//         secondButton="Stores"
//       />

//       <div className={styles.container}>
//         {loading ? (
//           <Loading />
//         ) : selectedSaleId ? (
//           <>
//             <button className={styles.backButton} onClick={closeModal}>
//               <ChevronDown className={styles.chevron} />Back
//             </button>
//             {isCustomer ? (
//               <Customer selectedSaleId={selectedSaleId} onClose={closeModal} />
//             ) : (
//               <Store selectedSaleId={selectedSaleId} onClose={closeModal} />
//             )}
//           </>
//         ) : (
//           <>
//             <HeaderRow isCustomer={isCustomer} />
//             <div className={styles.list}>
//               {filteredSales.map((sale) => (
//                 <SaleCard
//                   key={sale.id}
//                   type={isCustomer ? "customer" : "store"}
//                   data={{
//                     ...sale,
//                     contactName: `${sale.contactFirstName || ""} ${
//                       sale.contactLastName || ""
//                     }`.trim(), // Handle cases where contact names are missing
//                   }}
//                   onClick={() => onCardClick(sale.id)}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </PageContext.Provider>
//   );
// }
// src/container/Sale/Sales.jsx
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
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  // 1) extract fetch into a reusable callback
  const fetchSales = useCallback(() => {
    const endpoint = isCustomer ? "/Order/customer" : "/Order/store";
    axios
      .get(endpoint)
      .then(({ data }) => setSales(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch sales data.");
      });
  }, [isCustomer]);

  // 2) initial fetch & re-fetch when tab changes
  useEffect(() => {
    setSelectedSaleId(null);      // clear any open detail
    setSales([]);                 // clear stale rows
    setFilteredSales([]);
    fetchSales();
  }, [activePage, fetchSales]);

  // 3) apply the search filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredSales(filterSalesData(sales, filter, isCustomer));
    }, 300);
    return () => clearTimeout(timer);
  }, [filter, sales, isCustomer]);

  // open detail
  const onCardClick = useCallback((id) => {
    setSelectedSaleId(id);
  }, []);

  // close detail & re-fetch list
  const closeDetail = useCallback(() => {
    setSelectedSaleId(null);
    fetchSales();   // ← reload so your edits appear immediately
  }, [fetchSales]);

  return (
    <PageContext.Provider value={pageContext}>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
      />

      <div className={styles.container}>
        {selectedSaleId ? (
          <>
            <button className={styles.backButton} onClick={closeDetail}>
              <ChevronDown className={styles.chevron} /> Back
            </button>
            {isCustomer ? (
              <Customer
                selectedSaleId={selectedSaleId}
                onClose={closeDetail}
              />
            ) : (
              <Store
                selectedSaleId={selectedSaleId}
                onClose={closeDetail}
              />
            )}
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
                    contactName: `${sale.contactFirstName || ""} ${sale.contactLastName || ""}`.trim(),
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
