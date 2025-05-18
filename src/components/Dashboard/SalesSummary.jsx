import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./SalesSummary.module.css";
import ChevronDown from "../../icons/ChevronDown"; 

const SalesSummary = ({ data }) => {
  if (!data || data.length < 14) {
    // Expecting 14 days of data for a full comparison
    return (
      <div className={`${styles.salesSummaryCard} ${styles.noData}`}>
        Not enough sales data for a full summary. (Requires 14 days)
      </div>
    );
  }

  // Sort data by date to ensure correct chronological order
  const sortedData = [...data].sort(
    (a, b) => new Date(a.salesDate) - new Date(b.salesDate)
  );

  // Last 7 days for "This Week", previous 7 days for "Last Week"
  const thisWeekDataPoints = sortedData.slice(-7);
  const lastWeekDataPoints = sortedData.slice(-14, -7);

  if (thisWeekDataPoints.length < 7 || lastWeekDataPoints.length < 7) {
    return (
      <div className={`${styles.salesSummaryCard} ${styles.noData}`}>
        Data mismatch for week comparison.
      </div>
    );
  }

  // Prepare chart data
  // X-axis will show generic day numbers (01-07)
  const chartData = thisWeekDataPoints.map((thisWeekItem, index) => {
    const dayLabel = (index + 1).toString().padStart(2, "0"); // "01", "02", ..., "07"
    return {
      day: dayLabel,
      thisWeekSales: thisWeekItem.totalSales,
      lastWeekSales: lastWeekDataPoints[index]
        ? lastWeekDataPoints[index].totalSales
        : 0, // Fallback if somehow lengths mismatch
    };
  });

  // Calculate total sales for "This Week" and "Last Week"
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

  // Flatten all sales values
  const allValues = chartData.flatMap((d) => [
    d.thisWeekSales,
    d.lastWeekSales,
  ]);
  const maxValue = Math.max(...allValues);
  const roundedMax = Math.ceil(maxValue / 1000) * 1000;

  // Generate ticks spaced every 1000
  const ticks = [];
  for (let i = 0; i <= roundedMax; i += 1000) {
    ticks.push(i);
  }

  return (
    <div className={styles.salesSummaryCard}>
      <div className={styles.summaryHeader}>
        <h3>Sales Summary</h3>
        <a href="#view-report" className={styles.viewReportLink}>
          View Report <span><ChevronDown size={20}/></span>
        </a>
      </div>

      <div className={styles.summaryMetrics}>
        <span className={styles.totalSalesValue}>{salesValueForDisplay}</span>
        {percentageChangeDisplay.available && (
          <>
            <span
              className={`${styles.percentageChange} ${
                percentageChangeDisplay.positive
                  ? styles.positiveTrend
                  : styles.negativeTrend
              }`}
            >
              {percentageChangeDisplay.positive ? "🡩" : "🡫"}{" "}
              {percentageChangeDisplay.value}%
            </span>
            <span className={styles.vsLastWeek}>vs Last Week</span>
          </>
        )}
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{
              top: 30, 
              right: 0, 
              left: -10, 
              bottom: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "#979797" }}
              tick={{ fontSize: 11, fill: "#979797" }}
              padding={{ left: 30, right: 30 }}
            />

            <YAxis
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}k`
              }
              domain={[0, roundedMax]}
              ticks={ticks}
              tickLine={false}
              axisLine={{ stroke: "#979797" }}
              tick={{ fontSize: 11, fill: "#979797" }}
            />
            <Tooltip
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Legend 
              verticalAlign="bottom"
              align="left"
              height={10}
              iconType="circle"
              iconSize={10}
              formatter={(value, entry, index) => (
                <span
                  style={{
                    color: "#979797",
                    marginRight: "2em",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  {value}
                </span> 
              )}
              wrapperStyle={{ paddingLeft: "4.5em" }}
            />
            <Line
              type="linear"
              dataKey="thisWeekSales"
              name="This Week"
              stroke="#E11818"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="linear"
              dataKey="lastWeekSales"
              name="Last Week"
              stroke="#6F9320"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesSummary;
