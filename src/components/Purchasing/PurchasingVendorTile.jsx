

const PurchasingDetailsTile = props => {
    return (
        <article>
            <p>{props.vendorName}</p>
            <p>{props.phone}</p>
            <p>{props.businessId}</p>
            <p>{props.primaryContact}</p>
            <p>{props.email}</p>
            <p>{props.billingAddress}</p>
            <p>---------------------------</p>
        </article>
    )
}

export default PurchasingDetailsTile;