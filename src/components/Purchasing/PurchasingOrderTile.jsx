import { ChevronDown } from '../../icons';

const PurchasingOrderTile = props => {    
    return (
        <section>
            <p>{props.productName}</p>
            <p>{props.storeName}</p>
            <p>{props.orderDate}</p>
            <p>{props.orderQuantity}</p>
            <p>${props.totalDue}</p>
            <p>{props.shipDate}</p>
            <p>&#62;</p>
        </section>
    )
}

export default PurchasingOrderTile;