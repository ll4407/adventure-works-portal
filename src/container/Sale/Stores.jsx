import { useState, useEffect, useCallback, useContext } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import HeaderRow from "../../components/Sale/HeaderRow";
import styles from "./Sales.module.css";
import PageContext from "../../context/PageContext";
import { Outlet, useNavigate } from "react-router";
import Loading from "../../components/utils/Loading";
import { colors } from "../../utilities";
import { motion } from "motion/react";

// Helper function for filtering sales
const filterSalesData = (sales, filter) => {
  if (!filter) return sales || [];
  const lowered = filter.toLowerCase();
  return sales.filter((sale) =>
        sale.storeName?.toLowerCase().includes(lowered) ||
        sale.contactFirstName?.toLowerCase().includes(lowered) ||
        sale.contactLastName?.toLowerCase().includes(lowered)
  );
};

export default function Stores() {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { filter } = useContext(PageContext);
    const navigate = useNavigate()

  useEffect(() => {
    fetchSales();
  },[])

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
    axios
      .get("/Order/store")
      .then(({ data }) => setSales(data))
      .catch(() => {
        toast.error("Failed to fetch sales data.");
      })
      .finally(() => setLoading(false));
  }, []);


  // Apply the search filter
  useEffect(() => {
    if (!sales) return;
    const timer = setTimeout(() => {
      setFilteredSales(filterSalesData(sales, filter));
    }, 300);
    return () => clearTimeout(timer);
  }, [filter, sales]);

  // Handle clicking a card
  const onCardClick = (id) => {
        navigate(`/sales/stores/${id}`)};

    // Close detail
    const closeDetail = () => {
        navigate('/sales/stores')
    };
  if(loading) return <Loading color={colors.pink} />
  if(!filteredSales) return <>Something went wrong, please reload page</>

  return (
      <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }} 
            className={styles.container}>
        {/* Always render the list in desktop view - hide in mobile view*/}
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
        </div>
        <Outlet 
            context={{
                closeDetail:closeDetail, 
                updateSalesAfterChange:updateSalesAfterChange
                }} />
      </motion.div>
  );
}
