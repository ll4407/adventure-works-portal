import {useCallback, useState} from 'react'

import axios from '../../../api/axios'
import { toast } from 'react-toastify'

import { Edit } from '../../../icons'

import styles from '../Modal/ProductModal.module.css'

function CatalogModalForm({product, setRefresh}) {
    const [editing, setEditing] = useState(false)
    const [updatableName, setUpdatableName] = useState(product.productName)
    const [updatableNumber, setUpdatableNumber] = useState(product.productNumber)
    const [updatableColor, setUpdatableColor] = useState(product.color)
    const [updatableListPrice, setUpdatableListPrice] = useState(product.listPrice)

    const handleSubmit = useCallback((evt) =>{
        evt.preventDefault()
        axios.put(`/product/${product.productId}`, {
            productId: product.productId,
            productName: updatableName,
            productNumber: updatableNumber,
            color: updatableColor,
            listPrice: updatableListPrice
        }).then(res => {
            if(200 >= res.status < 300){
                toast.success(`${product.productName} updated`)
                setEditing(false)
                setRefresh(x => !x)
            }
        }).catch(err => 
            toast.error(err.message))

    }, [ product, 
        updatableName, 
        updatableNumber, 
        updatableColor, 
        updatableListPrice,
        setRefresh])

  return (
    <div className={styles.catalogModalForm}>
        {editing
            ? 
            <form onSubmit={handleSubmit}>
                <input 
                    className={styles.boldInput}
                    value={updatableName} 
                    onChange={(evt)=> setUpdatableName(evt.target.value)} />
                <input
                    className={styles.indentedInputs} 
                    value={updatableNumber} 
                    onChange={(evt)=> setUpdatableNumber(evt.target.value)} />
                <input
                    className={styles.indentedInputs} 
                    value={updatableColor} 
                    onChange={(evt)=> setUpdatableColor(evt.target.value)} />
                <input
                    className={styles.indentedInputs} 
                    value={updatableListPrice} 
                    onChange={(evt)=> setUpdatableListPrice(evt.target.value)} />
                <button className={styles.submitBtn} type='submit'>Save Changes</button>
                <button 
                    aria-label='Close form without saving' 
                    className={styles.cancelBtn} 
                    onClick={() => setEditing(false)}>Cancel</button>
            </form>
            :
            <div className={styles.catalogHeader}>
                <div>
                    <h1 className={styles.catalogProductName}>{product.productName}</h1>
                    <button className={styles.editBtn} onClick={() => setEditing(true)}>
                        <Edit />
                    </button>
                </div>
                <p className={styles.modalText}>{product.productNumber}</p>
                <p className={styles.modalText}>{product.color}</p>
                <p className={styles.modalText}>{product.listPrice}</p>
            </div>}
    </div>
  )
}

export default CatalogModalForm