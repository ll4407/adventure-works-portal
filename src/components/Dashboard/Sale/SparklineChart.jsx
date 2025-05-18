import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './SalesSummary.module.css'; 

const SparklineChart = ({ data, strokeColor = "#6F9320", strokeWidth = 2.5 }) => {
  if (!data || data.length === 0) {
    return <div className={styles.noDataText}>No chart data</div>; 
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data} 
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
        <Tooltip 
          formatter={(value, name, props) => [`Profit: $${value.toFixed(2)}`, null]}
          // Update the labelFormatter to show Day 1 through Day 7
          labelFormatter={(label) => `Day: ${parseInt(label, 10) + 1}`}  
        />
        <Line
          type="monotone"
          dataKey="value" 
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          dot={false}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;