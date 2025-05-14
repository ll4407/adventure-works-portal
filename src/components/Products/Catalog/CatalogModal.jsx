import { useCallback, useEffect, useState } from 'react'
import styles from '../ProductModal.module.css'
import { ChevronDown, Close, Minus, Plus } from '../../../icons'
import axios from '../../../api/axios'
import { toast } from 'react-toastify'
import DetailsRow from '../DetailsRow'
import CatalogModalForm from './CatalogModalForm'
import DetailsColumn from '../DetailsColumn'
import { useNavigate, useParams } from 'react-router'

    // const exampleProductDetails ={
    //   productId: 0,
    //   productName: "string",
    //   productNumber: "string",
    //   summary: "string",
    //   photo: "string",
    //   photoFileName: "string",
    //   color: "string",
    //   listPrice: 0,
    //   productLine: "string",
    //   productModelId: 0,
    //   productModelName: "string",
    //   wheelDescription: "string",
    //   saddleDescription: "string",
    //   pedalDescription: "string",
    //   riderExperience: "string",
    //   manufacturer: "string",
    //   bikeFrame: "string",
    //   crankset: "string",
    //   material: "string",
    //   style: "string",
    //   warrantyPeriod: "string",
    //   warrantyDescription: "string",
    //   maintenanceDescription: "string",
    //   numberOfSteps: 0,
    //   setupHours: 0,
    //   machineHours: 0,
    //   laborHours: 0,
    //   lotSize: 0
    // }


const CatalogModal = () => {
    const {productId} = useParams()
    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState(null)
    const [editing, setEditing] = useState(false)

    const removeActiveProduct = useCallback(() => {
        navigate('')
    }, [navigate])

    useEffect(() =>{
        axios.get(`/Product/${productId}`)
            .then(res => setProductDetails(res.data))
            .catch(err => toast.error(err.toString()))

    }, [])


    if(!productDetails) return null
    console.log(productDetails)

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button aria-label='Close Modal. Go back to list' className={styles.backBtn} onClick={removeActiveProduct}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
                </button>

                    {editing ? 
                    <CatalogModalForm product={productDetails} hideForm={() => setEditing(false)} /> : 
                    <div className={styles.modalHeader}>
                        {/* {productDetails.photoFileName ?? <img src={productDetails.photoFileName} alt={productDetails.productName}/>} */}
                        <h1 className={styles.h1}>{productDetails.productName}</h1>
                        <div className={styles.locationContainer}>
                            {/* <p>Location</p>
                            <p>Shelf {product.shelf}</p>
                            <p>Bin {product.bin}</p> */}
                        </div>
                    </div>}

                <div className={styles.detailsParent}>
                    <div className={styles.detailsSection}>
                        <h2>Product Details</h2>
                        <DetailsColumn 
                            label='Summary' 
                            value={productDetails.summary} />
                        <DetailsRow 
                            label='Product Model Id' 
                            value={productDetails.productId} />
                        <DetailsRow 
                            label='Manufacturer' 
                            value={productDetails.manufacturer} />
                        <DetailsRow 
                            label='Bike Frame' 
                            value={productDetails.bikeFrame} />
                        <DetailsRow 
                            label='Crankset' 
                            value={productDetails.crankset} />
                        <DetailsRow 
                            label='Material' 
                            value={productDetails.material} />
                        <DetailsRow 
                            label='Product Line' 
                            value={productDetails.productLine} />
                        <DetailsRow 
                            label='Style' 
                            value={productDetails.style} />
                    </div>
                    <div className={styles.detailsSection}>
                        <h2>Product Description</h2>
                        <DetailsColumn 
                            label='Wheel Description' 
                            value={productDetails.wheelDescription} />
                        <DetailsColumn 
                            label='Saddle Description' 
                            value={productDetails.saddleDescription} />
                        <DetailsColumn 
                            label='Pedal Description' 
                            value={productDetails.pedalDescription} />
                        <DetailsColumn 
                            label='Rider Experience' 
                            value={productDetails.riderExperience} />
                    </div>
                    <div className={styles.detailsSection}>
                        <h2>Warranty & Maintenance</h2>
                        <DetailsRow 
                            label='Warranty Period' 
                            value={productDetails.warrantyPeriod} />
                        <DetailsColumn 
                            label='Warranty Description' 
                            value={productDetails.warrantyDescription} />
                        <DetailsColumn 
                            label='Maintenance Description' 
                            value={productDetails.maintenanceDescription} />
                    </div>
                    <div className={styles.detailsSection}>
                        <h2>Manufacturing Details</h2>
                        <DetailsRow 
                            label='Manufacturer' 
                            value={productDetails.manufacturer} />
                        <DetailsRow 
                            label='Model Name' 
                            value={productDetails.productModelName} />
                        <DetailsRow 
                            label='Model Id' 
                            value={productDetails.productModelId} />
                        <DetailsRow 
                            label='Step' 
                            value={productDetails.numberOfSteps} />
                        <DetailsRow 
                            label='Set Up Hours' 
                            value={productDetails.setupHours} />
                        <DetailsRow 
                            label='Machine Hours' 
                            value={productDetails.machineHours} />
                        <DetailsRow 
                            label='Labor Hours' 
                            value={productDetails.labourHours} />
                        <DetailsRow 
                            label='Lot Size' 
                            value={productDetails.lotSize} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogModal