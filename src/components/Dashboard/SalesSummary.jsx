import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SalesSummary.module.css'; // Assuming you created this CSS module

const SalesSummary = ({ data }) => {
  if (!data || data.length === 0) {
    // Ensure styles.salesSummaryCard and styles.noData are defined in SalesSummary.module.css
    return <div className={`${styles.salesSummaryCard} ${styles.noData}`}>No sales data available.</div>;
  }

  // Sort data by date to ensure correct chart rendering and calculations
  const sortedData = [...data].sort((a, b) => new Date(a.salesDate) - new Date(b.salesDate));

  // Prepare data for the chart
  const chartData = sortedData.map(item => ({
    date: new Date(item.salesDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // Formatted date
    totalSales: item.totalSales,
    // Add other series if available, e.g., lastWeekSales
  }));

  // Calculate total sales and profit for the current period (e.g., last 7 days from data)
  const currentPeriodSales = sortedData.reduce((acc, curr) => acc + curr.totalSales, 0);
  const currentPeriodProfit = sortedData.reduce((acc, curr) => acc + curr.totalProfit, 0);

  // --- Placeholder for "vs Last Week" ---
  // This logic is complex and depends on how you define "last week"
  // and if your API provides that data directly or if you need to fetch it.
  // For now, let's use a placeholder.
  const salesValueForDisplay = (currentPeriodSales / 1000).toLocaleString('en-US', {
    minimumFractionDigits: (currentPeriodSales % 1000 === 0 && currentPeriodSales !== 0) ? 0 : 1,
    maximumFractionDigits: 1,
  }) + 'K';
  const percentageChangeDisplay = { value: 2.1, positive: false }; // Placeholder: e.g. 2.1% down
  // --- End Placeholder ---

  return (
    <div className={styles.salesSummaryCard}>
      <div className={styles.summaryHeader}>
        <h3>Sales Summary</h3>
        <a href="#view-report" className={styles.viewReportLink}>View Report →</a>
      </div>

      <div className={styles.summaryMetrics}>
        <span className={styles.totalSalesValue}>{salesValueForDisplay}</span>
        <span className={`${styles.percentageChange} ${percentageChangeDisplay.positive ? styles.positive : styles.negative}`}>
          {percentageChangeDisplay.positive ? '▲' : '▼'} {percentageChangeDisplay.value}%
        </span>
        <span className={styles.vsLastWeek}>vs Last Week</span>
      </div>

      <div style={{ width: '100%', height: 250 }}> {/* Adjusted height */}
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -20, // Adjust if Y-axis labels are cut off, or use 0 and check
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fontSize: 10 }}
              domain={['auto', 'auto']} // Or specify min/max if needed
            />
            <Tooltip
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey="totalSales" name="This Week" stroke="#38A169" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            {/* Placeholder for Last Week's sales line - requires data for 'lastWeekSales' in chartData */}
            {/* <Line type="monotone" dataKey="lastWeekSales" name="Last Week" stroke="#E53E3E" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Profit Section - as per your desktop screenshot, it's a separate card.
          You might move this to its own component later. */}
      <div className={styles.totalProfitSection}>
         <h4>Total Profit (Last 7 days)</h4>
         <p className={styles.profitValue}>{currentPeriodProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
         {/* Placeholder for trend icon/text */}
         <span className={styles.profitTrend}>
           <span className={styles.negative}>▼ 2%</span> vs last 7 days {/* Example trend */}
         </span>
      </div>
    </div>
  );
};

export default SalesSummary;