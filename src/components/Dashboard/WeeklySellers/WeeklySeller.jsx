import { PieChart, Pie, Legend, Tooltip } from "recharts";
import styles from './WeeklySeller.module.css'

function WeeklySeller(props) {
    const { title, productName, unitsSold, unitsInStock, color } = props;

    const data = [
        {name: "unitsInStock", value: unitsInStock, fill: `rgba(${color}, 0.5)`},
        {name: "unitsSold", value: unitsSold, fill: `rgba(${color}, 1)` }
    ];

    return (
        <div className={styles.seller}>
            <p>{title}</p>

            <PieChart width={500} height={200}>
                <Pie
                    data={data}
                    dataKey='value'
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={120}
                    endAngle={420}
                />
                
                <text x={250} y={90} textAnchor="middle" dominantBaseline="middle" fontWeight={700} fontSize={24}>
                    {unitsSold} 
                </text>
                <text x={250} y={115} textAnchor="middle" dominantBaseline="middle" fontWeight={700}>
                    units
                </text>
                <Tooltip />
            </PieChart>

            <div>
                <p>{productName}</p>
                <p>Qty in Stock: {unitsInStock}</p>  
            </div>
            
        </div>
    )

}

export default WeeklySeller;