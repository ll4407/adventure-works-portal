const Inventory = (props) =>{

    console.log(props)
    const {products} = props
    return(
        <>
        Inventory
            {products.map(prod => (
                <div>
                    <p>{prod.productName}</p>
                </div>
            ))}
        </>
    )
}

export default Inventory