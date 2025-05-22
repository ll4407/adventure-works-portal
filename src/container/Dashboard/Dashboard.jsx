import { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./Dashboard.module.css";
import SalesSummary from "../../components/Dashboard/Sale/SalesSummary";
import TotalProfit from "../../components/Dashboard/Sale/TotalProfit";
import { toast } from "react-toastify";
import LowStockList from "../../components/Dashboard/LowStockList";


export default function Dashboard() {
  const [weeklySales, setWeeklySales] = useState(null);
  const [bestWorst, setBestWorst] = useState(null);
  const [lowStock, setLowStock] = useState(null);
  const [shifts, setShifts] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const [salesRes, bestWorstRes, lowStockRes, shiftsRes] =
          await Promise.all([
            axios.get("/Dashboard/weekly-sales"),
            axios.get("/Dashboard/best-worst"),
            axios.get("/Dashboard/low-stock"),
            axios.get("/Dashboard/shifts"),
          ]);
        setWeeklySales(salesRes.data);
        setBestWorst(bestWorstRes.data);
        setLowStock(lowStockRes.data);
        setShifts(shiftsRes.data);
      } catch (err) {
        const errorMessage = "Failed to load some dashboard data.";
        toast.error(err.toString() || errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  console.log('lowStock', lowStock)

  if (loading) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }

  if(!lowStock) return <>no low stock</>
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.grid}>
        <div className={styles.salesSummary}>
            <SalesSummary data={weeklySales} />
        </div>
        <div className={styles.totalProfit}>
          <TotalProfit data={weeklySales} />
        </div>
        <div className={styles.productPerformance}>
          Weekly Bestseller / Lowest Weekly Seller
        </div>
        <LowStockList products={lowStock} />
        <div className={styles.shifts}>
          Shifts 
        </div>
      </div>
    </div>
  );
}
