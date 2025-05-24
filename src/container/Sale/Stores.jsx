import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import HeaderRow from "../../components/Sale/HeaderRow";
import styles from "./Sales.module.css";
import PageContext from "../../context/PageContext";
import Loading from "../../components/utils/Loading";
import { colors } from "../../utilities";
import { motion } from "motion/react";
import { Outlet, useNavigate, useParams } from "react-router-dom";


// Helper function for filtering sales
const filterSalesData = (sales, filter) => {
  if (!filter) return sales || []; // Ensure sales is an array
  const lowered = filter.toLowerCase();
  return sales.filter(
    (sale) =>
      sale.storeName?.toLowerCase().includes(lowered) ||
      sale.contactFirstName?.toLowerCase().includes(lowered) ||
      sale.contactLastName?.toLowerCase().includes(lowered)
  );
};

export default function Stores() {

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { filter } = useContext(PageContext);
    const navigate = useNavigate()


  // Get route parameters to determine if a detail view is active
  const params = useParams();
  const isDetailViewActive = !!params.id;

  // Fetch sales data
  const fetchSales = useCallback(() => {
    axios
      .get("/Order/store") // Endpoint for store sales
      .then(({ data }) => {
        setSales(data || []); // Ensure sales is an array
      })
      .catch(() => {
        toast.error("Failed to fetch store sales data.");
        setSales([]); // Set to empty array on error
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]); // Add fetchSales to dependency array

  // Callback to update sales state after a store update
const updateSalesAfterChange = useCallback((updatedSale) => {
  const firstContact = updatedSale.contacts?.[0];
  setSales((prevSales) =>
    (prevSales || []).map((sale) =>
      sale.id === updatedSale.id
        ? {
            ...sale,
            ...updatedSale,
            contactFirstName: firstContact?.firstName || sale.contactFirstName,
            contactLastName: firstContact?.lastName || sale.contactLastName,
          }
        : sale
    )
  );
}, []);

  // Use `useMemo` to calculate filtered sales dynamically
  const filteredSales = useMemo(() => {
    return filterSalesData(sales, filter);
  }, [sales, filter]);

  // Handle clicking a card
  const onCardClick = (id) => {
    navigate(`/sales/stores/${id}`);
  };

    // Close detail
    const closeDetail = () => {
        navigate('/sales/stores')
    };


  // Construct class names for the list container
  const listContainerClasses = [styles.hiddenMobileWhenModal];
  if (isDetailViewActive) {
    listContainerClasses.push(styles.hideListWhenModalActiveMobile);
  }

  // Conditional rendering for loading and no data states
  if (loading || (sales.length > 0 && filteredSales.length === 0 && !filter)) {
    return (
      <Loading color={colors.pink} />
    );
  }

  if (!loading && sales.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noSalesMessage}>No store sales found.</div>
      </div>
    );
  }

  return (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: .5 }} 
    className={styles.container}
  >
    <div className={styles.hiddenMobileWhenModal}>
      <HeaderRow isCustomer={false} />
      <div className={styles.list}>
        {filteredSales.map((sale) => (
          <SaleCard
            key={sale.id}
            type={"store"}
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
      {filter && filteredSales.length === 0 && (
        <div className={styles.noSalesMessage}>
          No sales match your filter.
        </div>
      )}
    </div>
    {/* Outlet is outside the list container */}
    <Outlet 
      context={{
        closeDetail: closeDetail, 
        updateSalesAfterChange: updateSalesAfterChange
      }} 
    />
  </motion.div>
);
}