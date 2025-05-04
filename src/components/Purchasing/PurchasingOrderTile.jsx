

const PurchasingOrderTile = props => {    
    return (
        <tr>
            <td>{props.productName}</td>
            <td>{props.storeName}</td>
            <td>{props.orderDate}</td>
            <td>{props.orderQuantity}</td>
            <td>{props.lineTotal}</td>
            <td>{props.shipDate}</td>
        </tr>
    )
}

export default PurchasingOrderTile;