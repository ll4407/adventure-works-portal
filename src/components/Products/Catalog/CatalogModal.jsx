import { useCallback, useEffect, useState } from 'react'
import styles from '../Modal/ProductModal.module.css'
import { ChevronDown, Close } from '../../../icons'
import axios from '../../../api/axios'
import { toast } from 'react-toastify'
import DetailsRow from '../Modal/DetailsRow'
import CatalogModalForm from './CatalogModalForm'
import DetailsColumn from '../Modal/DetailsColumn'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import DetailsSection from '../Modal/DetailsSection'


const CatalogModal = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState(null)
    const {refresh, setRefresh} = useOutletContext()

    const removeActiveProduct = useCallback(() => {
        navigate('/products/Catalog')
    }, [navigate])

    useEffect(() =>{
        console.log('refresh ran')
        axios.get(`/Product/${id}`)
            .then(res => setProductDetails(res.data))
            .catch(err => toast.error(err.toString()))

    }, [refresh, id])


    if(!productDetails) return null

    const details={
        productDetailsContent:[{
            label:'Summary',
            value:productDetails.summary,   
            column:true,
        },{
            label:'Product Model Id',
            value:productDetails.productId
        },{
            label:'Manufacturer',
            value:productDetails.manufacturer
        },{
            label:'Bike Frame',
            value:productDetails.bikeFrame
        },{
            label:'Crankset',
            value:productDetails.crankset
        },{
            label:'Material',
            value:productDetails.material
        },{
            label:'Product Line',
            value:productDetails.productLine
        },{
            label:'Style',
            value:productDetails.style
        }],
        productDescriptionsContent:[{
            label:'Wheel Description',
            value:productDetails.wheelDescription,
            column:true,
        },{
            label:'Saddle Description',
            value:productDetails.saddleDescription
        },{
            label:'Pedal Description',
            value:productDetails.pedalDescription
        },{
            label:'Rider Experience',
            value:productDetails.riderExperience
        }],
        productWarrantyContent:[{
            label:'Warranty Period',
            value:productDetails.warrantyPeriod,
        },{
            label:'Warranty Description',
            value:productDetails.warrantyDescription,
            column:true,
        },{
            label:'Maintenance Description',
            value:productDetails.maintenanceDescription,
            column:true,
        }],
        productManufacturingContent:[{
            label:'Manufacturer',
            value:productDetails.manufacturer
        },{
            label:'Model Name',
            value:productDetails.productModelName
        },{
            label:'Model Id',
            value:productDetails.productModelId
        },{
            label:'Step',
            value:productDetails.numberOfSteps
        },{
            label:'Set Up Hours',
            value:productDetails.setupHours
        },{
            label:'Machine Hours',
            value:productDetails.machineHours
        },{
            label:'Labor Hours',
            value:productDetails.labourHours
        },{
            label:'Lot Size',
            value:productDetails.lotSize
        }]
    }

    return (
        <div className={styles.modalContainer} onClick={removeActiveProduct}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button 
                    aria-label='Close Modal. Go back to list' 
                    className={styles.backBtn} 
                    onClick={removeActiveProduct}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
                </button>
                <div className={styles.centeredDiv}>
                    <img 
                    src={productDetails.thumbnailPhoto} 
                    alt={productDetails.productName} 
                    className={styles.productImage} />
                </div>
                <CatalogModalForm product={productDetails} refresh={refresh} setRefresh={setRefresh} />
                <div className={styles.catalogDetailsParent}>
                    <DetailsSection
                        content={details.productDetailsContent}
                        title='Product Details' />
                    <DetailsSection
                        content={details.productDescriptionsContent}
                        title='Product Descriptions'
                        containerClassName={styles.catalogTopRow} />
                    
                    <DetailsSection
                        content={details.productWarrantyContent}
                        title='Warranty & Maintenance'/>
                    <DetailsSection
                        content={details.productManufacturingContent}
                        title='Manufacturing Details' />
                </div>
            </div>
        </div>
    )
}

export default CatalogModal