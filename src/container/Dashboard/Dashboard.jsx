import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";

import WeeklySeller from "../../components/Dashboard/WeeklySellers/WeeklySeller";


export default function Dashboard() {
  const [weeklySales, setWeeklySales] = useState([]);
  const [bestWorst, setBestWorst] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [shifts, setShifts] = useState([]);
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
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }


  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>

      <div className={styles.grid}>
        <div className={styles.salesSummary}>
            Sales Summary
        </div>
        <div className={styles.totalProfit}>
        </div>
        <div className={styles.productPerformance}>
          <WeeklySeller 
            title={"Weekly Bestseller"}
            productName={bestWorst[0].productName}
            unitsSold={bestWorst[0].unitsSold}
            unitsInStock={bestWorst[0].unitsInStock}
            color={'155, 197, 61'}
          /> 

          <WeeklySeller 
            title={"Lowest Weekly Seller"}
            productName={bestWorst[1].productName}
            unitsSold={bestWorst[1].unitsSold}
            unitsInStock={bestWorst[1].unitsInStock}
            color={ '225, 24, 24' }
          /> 
        </div>
        <div className={styles.lowStock}>
          Low Stock Products 
        </div>
        <div className={styles.shifts}>
          Shifts 
        </div>
      </div>
    </div>
  );
}
