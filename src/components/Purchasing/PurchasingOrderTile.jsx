import { ChevronDown } from '../../icons';

const PurchasingOrderTile = props => {    
    return (
        <tr>
            <td>{props.productName}</td>
            <td>{props.storeName}</td>
            <td>{props.orderDate}</td>
            <td>{props.orderQuantity}</td>
            <td>${props.totalDue}</td>
            <td>{props.shipDate}</td>
            <td>&#62;</td>
        </tr>
    )
}

export default PurchasingOrderTile;