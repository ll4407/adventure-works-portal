
const SalesSummaryMetrics = ({ styles, salesValueForDisplay, percentageChangeDisplay }) => {
  return (
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
  );
};

export default SalesSummaryMetrics;