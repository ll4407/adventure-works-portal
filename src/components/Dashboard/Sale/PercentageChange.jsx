import styles from './TotalProfit.module.css';
const PercentageChange = ({ data, isPositiveChange, percentageChange }) => {
  
  if (!data || data.length < 7) {
    return null;
  }

  return (
    <div className={styles.percChangeWrapper}>
      <span className={`${styles.percentageChange} ${isPositiveChange ? styles.positive : styles.negative}`}>
        {isPositiveChange ? "🡩" : "🡫"} {Math.abs(percentageChange)}%
      </span>
      <span className={styles.comparisonText}>vs last 7 days</span>
    </div>
  );
};

export default PercentageChange;