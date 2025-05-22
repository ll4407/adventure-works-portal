import React, { useMemo } from 'react'; 
import styles from "./SalesSummary.module.css";
import ChevronDown from "../../../icons/ChevronDown"; 
import SalesSummaryMetrics from './SalesSummaryMetrics'; 
import SalesComparisonChart from './SalesComparisonChart'; 

const SalesSummary = ({ data }) => {
  const processedSalesData = useMemo(() => {
    if (!data || data.length < 14) {
      return {
        valid: false,
        errorMessage: "Not enough sales data for a full summary. (Requires 14 days)",
      };
    }

    const sortedData = [...data].sort(
      (a, b) => new Date(a.salesDate) - new Date(b.salesDate)
    );

    const thisWeekDataPoints = sortedData.slice(-7);
    const lastWeekDataPoints = sortedData.slice(-14, -7);

    if (thisWeekDataPoints.length < 7 || lastWeekDataPoints.length < 7) {
      return {
        valid: false,
        errorMessage: "Data mismatch for week comparison.",
      };
    }

    const chartData = thisWeekDataPoints.map((thisWeekItem, index) => {
      const dayLabel = (index + 1).toString().padStart(2, "0");
      return {
        day: dayLabel,
        thisWeekSales: thisWeekItem.totalSales,
        lastWeekSales: lastWeekDataPoints[index]
          ? lastWeekDataPoints[index].totalSales
          : 0,
      };
    });

    const thisWeekSalesTotal = thisWeekDataPoints.reduce(
      (acc, curr) => acc + curr.totalSales,
      0
    );
    const lastWeekSalesTotal = lastWeekDataPoints.reduce(
      (acc, curr) => acc + curr.totalSales,
      0
    );

    const salesValueForDisplay =
      (thisWeekSalesTotal / 1000).toLocaleString("en-US", {
        minimumFractionDigits:
          thisWeekSalesTotal % 1000 === 0 && thisWeekSalesTotal !== 0 ? 0 : 1,
        maximumFractionDigits: 1,
      }) + "K";

    let percentageChangeDisplay = { value: 0, positive: false, available: false };
    if (lastWeekSalesTotal > 0) {
      const change =
        ((thisWeekSalesTotal - lastWeekSalesTotal) / lastWeekSalesTotal) * 100;
      percentageChangeDisplay = {
        value: Math.abs(change).toFixed(1),
        positive: change >= 0,
        available: true,
      };
    } else if (thisWeekSalesTotal > 0) {
      percentageChangeDisplay = { value: 100, positive: true, available: true };
    } else {
      percentageChangeDisplay = { value: 0, positive: false, available: true }; 
    }

    const allValues = chartData.flatMap((d) => [
      d.thisWeekSales,
      d.lastWeekSales,
    ]);
    const maxValue = Math.max(...allValues, 0); 
    const roundedMax = Math.ceil(maxValue / 1000) * 1000;
    
    const ticks = [];
    if (roundedMax === 0) {
        ticks.push(0);
    } else {
        for (let i = 0; i <= roundedMax; i += 1000) {
            ticks.push(i);
        }
    }

    return {
      valid: true,
      salesValueForDisplay,
      percentageChangeDisplay,
      chartData,
      roundedMax,
      ticks,
    };
  }, [data]);

  if (!processedSalesData.valid) {
    return (
      <div className={`${styles.salesSummaryCard} ${styles.noData}`}>
        {processedSalesData.errorMessage}
      </div>
    );
  }

  const {
    salesValueForDisplay,
    percentageChangeDisplay,
    chartData,
    roundedMax,
    ticks,
  } = processedSalesData;

  return (
    <div className={styles.salesSummaryCard}>
      <div className={styles.summaryHeader}>
        <h3>Sales Summary</h3>
        <a href="#view-report" className={styles.viewReportLink}>
          View Report <span><ChevronDown size={20}/></span>
        </a>
      </div>

      <SalesSummaryMetrics
        styles={styles}
        salesValueForDisplay={salesValueForDisplay}
        percentageChangeDisplay={percentageChangeDisplay}
      />

      <SalesComparisonChart
        styles={styles} 
        chartData={chartData}
        roundedMax={roundedMax}
        ticks={ticks}
      />
    </div>
  );
};

export default SalesSummary;