import {useState} from 'react'

function CatalogModalForm({product, hideForm}) {

    const [updatableName, setUpdatableName] = useState(product.productName)
    const [updatableNumber, setUpdatableNumber] = useState(product.productNumber)
    const [updatableColor, setUpdatableColor] = useState(product.color)
    const [updatableListPrice, setUpdatableListPrice] = useState(product.listPrice)



  return (
    <>
        <form>
            <input 
                value={updatableName} 
                onChange={(evt)=> setUpdatableName(evt.target.value)} />
            <input 
                value={updatableNumber} 
                onChange={(evt)=> setUpdatableNumber(evt.target.value)} />
            <input 
                value={updatableColor} 
                onChange={(evt)=> setUpdatableColor(evt.target.value)} />
            <input 
                value={updatableListPrice} 
                onChange={(evt)=> setUpdatableListPrice(evt.target.value)} />
        </form>
        <button onClick={hideForm}>Cancel</button>
    </>
  )
}

export default CatalogModalForm