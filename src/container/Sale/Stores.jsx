import { useState, useEffect, useCallback, useContext } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import HeaderRow from "../../components/Sale/HeaderRow";
import styles from "./Sales.module.css";
import PageContext from "../../context/PageContext";
import { Outlet, useNavigate, useParams } from "react-router-dom"; 

// Helper function for filtering sales
const filterSalesData = (sales, filter) => {
  if (!filter) return sales || []; // Ensure sales is an array
  const lowered = filter.toLowerCase();
  return sales.filter((sale) =>
        sale.storeName?.toLowerCase().includes(lowered) ||
        sale.contactFirstName?.toLowerCase().includes(lowered) ||
        sale.contactLastName?.toLowerCase().includes(lowered)
  );
};

export default function Stores() {
    const [sales, setSales] = useState([]); // Initialize with an empty array
    const [filteredSales, setFilteredSales] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading to true
    
    const { filter } = useContext(PageContext);
    const navigate = useNavigate();

    // Get route parameters to determine if a detail view is active
    const params = useParams();
    // Assumes detail route is  "/sales/stores/:id"
    const isDetailViewActive = !!params.id; 


    // Fetch sales data
    const fetchSales = useCallback(() => {
        setLoading(true);
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
        setSales((prevSales) =>
        (prevSales || []).map((sale) => // Handle prevSales potentially being null/undefined
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
        navigate(`/sales/stores/${id}`);
    };

    // Close detail
    const closeDetail = () => {
        navigate('/sales/stores');
    };

    // Construct class names for the list container
    const listContainerClasses = [styles.hiddenMobileWhenModal];
    if (isDetailViewActive) {
        listContainerClasses.push(styles.hideListWhenModalActiveMobile);
    }

    // Conditional rendering for loading and no data states
    if (loading && sales.length === 0) {
        return <div className={styles.container}><div className={styles.noSalesMessage}>Loading store sales...</div></div>;
    }

    return (
        <div className={styles.container}>
            <div className={listContainerClasses.join(' ')}>
            <HeaderRow isCustomer={false} /> {/* Correct for stores view */}
            <div className={styles.list}>
                {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
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
                ))
                ) : (
                    !loading && <div className={styles.noSalesMessage}>No store sales found.</div>
                )}
            </div>
            </div>
            <Outlet 
                context={{
                    closeDetail:closeDetail, 
                    updateSalesAfterChange:updateSalesAfterChange
                }} />
        </div>
    );
}