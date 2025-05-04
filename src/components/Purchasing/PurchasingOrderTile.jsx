

const PurchasingDetailsTile = props => {
    return (
        <article>
            <p>{props.productName}</p>
            <p>{props.storeName}</p>
            <p>{props.orderDate}</p>
            <p>{props.orderQuantity}</p>
            <p>{props.lineTotal}</p>
            <p>{props.shipDate}</p>
            <p>---------------------------</p>
        </article>
    )
}

export default PurchasingDetailsTile;