

const PurchasingDetailsTile = props => {
    return (
        <tbody>
            <tr>
                <td>{props.vendorName}</td>
                <td>{props.phone}</td>
                <td>{props.businessId}</td>
                <td>{props.primaryContact}</td>
                <td>{props.email}</td>
                <td>{props.billingAddress}</td>
            </tr>
        </tbody>
    )
}

export default PurchasingDetailsTile;