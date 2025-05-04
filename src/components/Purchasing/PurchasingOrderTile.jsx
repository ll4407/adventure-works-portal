

const PurchasingDetailsTile = props => {
    return (
        <tbody>
            <tr>
                <td>{props.productName}</td>
                <td>{props.storeName}</td>
                <td>{props.orderDate}</td>
                <td>{props.orderQuantity}</td>
                <td>{props.lineTotal}</td>
                <td>{props.shipDate}</td>
            </tr>
        </tbody>
    )
}

export default PurchasingDetailsTile;