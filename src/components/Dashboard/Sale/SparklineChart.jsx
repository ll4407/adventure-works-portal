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
          labelFormatter={(label) => {
            const dayNumber = parseInt(label, 10) + 1;
            const formattedDay = String(dayNumber).padStart(2, '0');
            return `Day: ${formattedDay}`;
          }}  
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