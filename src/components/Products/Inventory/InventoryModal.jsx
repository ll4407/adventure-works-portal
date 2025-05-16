import { useCallback, useEffect, useState } from 'react'
import styles from '../Modal/ProductModal.module.css'
import { ChevronDown, Close, Minus, Plus } from '../../../icons'
import axios from '../../../api/axios'
import { toast } from 'react-toastify'
import DetailsRow from '../Modal/DetailsRow'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import DetailsSection from '../Modal/DetailsSection'

const InventoryModal = () => {
    const [productToDisplay, setProductToDisplay] = useState(null)
    const [quantity, setQuantity] = useState(null)

    const {product, setActiveProduct, allProducts, setRefresh} = useOutletContext()
    const {productId, locationId} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        if(!productToDisplay){
            if(product){
                setQuantity(product.quantity)
                setProductToDisplay(product)
            }else{
                const selectedProduct = 
                    allProducts.find(prod => 
                        prod.productId == productId && 
                        prod.locationId == locationId)
                setQuantity(selectedProduct.quantity)
                setProductToDisplay(selectedProduct)
            }
        }
        
    }, [allProducts, productToDisplay, product, productId, locationId])

    const removeActiveProduct = useCallback(() => {
        setActiveProduct(null)
        navigate('/products')
    }, [setActiveProduct, navigate])

    useEffect(() => {
        let timer 
            // this check stops this from running on the first render 
            if(productToDisplay && quantity != productToDisplay.quantity){
                timer = setTimeout(() => {
                    axios.put(`/Inventory/${productId}/${locationId}`, {
                        productId: productId,
                        locationId: locationId,
                        quantity: quantity
                    }).then(res => {
                        if(200 >= res.status < 300){
                            toast.success(`${productToDisplay.productName} quantity updated`)
                            //refresh products page data
                            setRefresh(x => !x)
                        }
                    }).catch(err => toast.error(err.message))
                }, 1000)
            }


        return () => {
            clearTimeout(timer)
        }

    }, [quantity, productToDisplay, setRefresh, productId, locationId])

    if(!productToDisplay) return null

    const details = {
        productDetailsContent: [
            {
                label: 'Product Name',
                value: productToDisplay.productName,
            },
            {
                label: 'Product Id',
                value: productToDisplay.productId
            },
            {
                label: 'Product Number',
                value: productToDisplay.productNumber
            },
            {
                label: 'Safety Stock Level',
                value: productToDisplay.safetyStockLevel
            },
            {
                label: 'Reorder Point',
                value: productToDisplay.reorderPoint
            }
        ],
        productDescriptionsContent: [
            {
                label: 'Location',
                value: productToDisplay.locationName,
            },
            {
                label: 'Location ID',
                value: productToDisplay.locationId
            },
            {
                label: 'Shelf',
                value: productToDisplay.shelf
            },
            {
                label: 'Bin',
                value: productToDisplay.bin
            }
        ]
    }

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button aria-label='Close Modal. Go back to list' className={styles.backBtn} onClick={removeActiveProduct}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
                </button>
                <div className={styles.modalHeader}>
                    <h1 className={styles.h1}>{productToDisplay.productName}</h1>
                    <div className={styles.locationContainer}>
                        <p>Location</p>
                        <p>Shelf {productToDisplay.shelf}</p>
                        <p>Bin {productToDisplay.bin}</p>
                    </div>
                    <div className={styles.quantityContainer}>
                        <p>Quantity</p>
                        <div className={styles.quantityControls}>
                            <button onClick={() => setQuantity(q => q-1)}>
                                <Minus />
                            </button>
                            <p>{quantity}</p>
                            <button onClick={() => setQuantity(q => q+1)}>
                                <Plus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.detailsParent}>
                    <DetailsSection
                        content={details.productDetailsContent}
                        title='Product Details' />
                    <DetailsSection
                        content={details.productDescriptionsContent}
                        title='Product Descriptions'/>
                </div>
            </div>
        </div>
    )
}

export default InventoryModal