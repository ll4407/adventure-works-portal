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

const SalesComparisonChart = ({ styles, chartData, roundedMax, ticks }) => {
  return (
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
            formatter={(value) => (
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
  );
};

export default SalesComparisonChart;