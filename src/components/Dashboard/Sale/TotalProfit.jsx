import React, { useMemo } from "react";
import styles from "./TotalProfit.module.css";
import SparklineChart from "./SparklineChart";
import PercentageChange from "./PercentageChange"; 

const TotalProfit = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data || data.length < 7) {
      return { currentProfit: 0, percentageChange: 0, sparklineData: [] };
    }

    // Ensure data is sorted by date, oldest to newest
    const sortedSales = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const thisWeekDataPoints = sortedSales.slice(-7);
    const lastWeekDataPoints =
      sortedSales.length >= 14 ? sortedSales.slice(-14, -7) : [];

    const currentProfitSum = thisWeekDataPoints.reduce(
      (acc, curr) => acc + (curr.totalProfit || 0),
      0
    );

    const sparkline = thisWeekDataPoints.map((day) => ({
      value: day.totalProfit || 0,
    }));

    let percentage = 0;
    if (lastWeekDataPoints.length === 7) {
      const lastWeekProfitSum = lastWeekDataPoints.reduce(
        (acc, curr) => acc + (curr.totalProfit || 0),
        0
      );
      if (lastWeekProfitSum > 0) {
        percentage =
          ((currentProfitSum - lastWeekProfitSum) / lastWeekProfitSum) * 100;
      } else if (currentProfitSum > 0) {
        percentage = 100;
      }
    }

    return {
      currentProfit: currentProfitSum,
      sparklineData: sparkline,
      percentageChange: parseFloat(percentage.toFixed(1)),
    };
  }, [data]);

  const { currentProfit, percentageChange, sparklineData } = processedData;
  const isPositiveChange = percentageChange >= 0;

  const formatProfit = (amount) => {
    if (amount >= 1000) {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount)) return "0K";
      return `${(numericAmount / 1000).toFixed(0)}K`;
    }
    return String(amount);
  };

  return (
    <div className={styles.totalProfitCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Total Profit</h3>
        <p className={styles.subtitle}>Last 7 days</p>
      </div>
      <div className={styles.body}>
        <div className={styles.profitInfo}>
          <span className={styles.profitValue}>
            {formatProfit(currentProfit)}
          </span>
          <PercentageChange
            data={data}
            isPositiveChange={isPositiveChange}
            percentageChange={percentageChange}
          />
        </div>
        <div className={styles.sparkline}>
          <div className={styles.chartPlaceholder}>
            <SparklineChart data={sparklineData} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalProfit;
