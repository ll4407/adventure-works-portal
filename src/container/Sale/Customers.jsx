import { useState, useEffect, useCallback, useContext } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import HeaderRow from "../../components/Sale/HeaderRow";
import styles from "./Sales.module.css";
import PageContext from "../../context/PageContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/utils/Loading";
import { colors } from "../../utilities";
import { motion } from "motion/react";

import sortedArray from "../SortBy/Sortby";

// Helper function for filtering sales
const filterSalesData = (sales, filter) => {
  if (!filter) return sales || []; // Ensure sales is an array
  const lowered = filter.toLowerCase();
  return sales.filter(
    (sale) =>
      sale.firstName?.toLowerCase().includes(lowered) ||
      sale.lastName?.toLowerCase().includes(lowered) ||
      sale.orderNumber?.toString().includes(lowered)
  );
};

export default function Customers() {
  const [sales, setSales] = useState([]); // Initialize with an empty array
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  const { filter } = useContext(PageContext);
  const navigate = useNavigate();

  // Get route parameters to determine if a detail view is active
  const params = useParams();
  const isDetailViewActive = !!params.id;


  //Sorting 
        const [newArray, setNewArray] = useState(false);
        const [sortedBy, setSortedBy] = useState("");
        const [sortDirection, setSortDirection] = useState(false);

    useEffect(() => {
            setSortDirection(false); //Keeps track of current sort direction: ASC/DESC
        }, [sortedBy]);
    
    useEffect(() => {
      //force rerender when User activates sort method
    }, [newArray, sortedBy]);
    
    //activates sort function and sets filter list
    const handleSortChange = (name, dataType) => {
        setFilteredSales(sortedArray(filteredSales, name, dataType, sortDirection));

        setSortedBy(name);
        setSortDirection(x => !x);
        setNewArray(x => !x);
    }
    //


  // Fetch sales data
  const fetchSales = useCallback(() => {
    setLoading(true);
    axios
      .get("/Order/customer") // Endpoint for customer sales
      .then(({ data }) => {
        setSales(data || []); // Ensure sales is an array
      })
      .catch(() => {
        toast.error("Failed to fetch customer sales data.");
        setSales([]); // Set to empty array on error
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]); // Add fetchSales to dependency array

  // Callback to update sales state after a customer update
  const updateSalesAfterChange = useCallback((updatedSale) => {
    setSales((prevSales) =>
      (prevSales || []).map((sale) =>
        sale.id === updatedSale.id ? { ...sale, ...updatedSale } : sale
      )
    );
  }, []);

  // Apply the search filter
  useEffect(() => {
    const currentSales = Array.isArray(sales) ? sales : []; // Ensure sales is an array
    const timer = setTimeout(() => {
      setFilteredSales(filterSalesData(currentSales, filter));
    }, 300);

    return () => clearTimeout(timer);
  }, [filter, sales]);

  // Handle clicking a card
  const onCardClick = (id) => {
    console.log("Clicked on card with id:", id);
    navigate(`/sales/customers/${id}`);
  };

  // Close detail
  const closeDetail = () => {
    navigate("/sales/customers");
  };

  // Construct class names for the list container
  const listContainerClasses = [styles.hiddenMobileWhenModal];
  if (isDetailViewActive) {
    listContainerClasses.push(styles.hideListWhenModalActiveMobile);
  }
  if(loading) return <Loading color={colors.pink} /> // Show loading spinner if loading

  // Conditional rendering for loading and no data states
  if ( filteredSales.length > 0) { 
<<<<<<< HEAD
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }} className={styles.container}>
            {/* Always render the list in desktop view - hide in mobile view*/}
            <div className={styles.hiddenMobileWhenModal}>
                <HeaderRow isCustomer={true} handleSort={handleSortChange} />
                <div className={styles.list}>
                    {filteredSales.map((sale) => (
                    <SaleCard
                        key={sale.id}
                        type={"customer"}
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
                    closeDetail: closeDetail,
                    updateSalesAfterChange: updateSalesAfterChange,
                }} />
        </motion.div>
        )
=======
return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {/* Always render the list in desktop view - hide in mobile view */}
      <div className={listContainerClasses.join(" ")}>
        <HeaderRow isCustomer={true} />
        <div className={styles.list}>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <SaleCard
                key={sale.id}
                type={"customer"}
                data={{
                  ...sale,
                  contactName: `${sale.contactFirstName || ""} ${
                    sale.contactLastName || ""
                  }`.trim(),
                }}
                onClick={() => onCardClick(sale.id)}
              />
            ))
          ) : (
            filter && (
              <div className={styles.noSalesMessage}>
                No sales match your filter.
              </div>
            )
          )}
        </div>
      </div>
      {/* Outlet is outside the list container */}
      <Outlet
        context={{
          closeDetail: closeDetail,
          updateSalesAfterChange: updateSalesAfterChange,
        }}
      />
    </motion.div>
  );
>>>>>>> main
}}

