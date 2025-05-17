import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { ChevronDown, Close } from '../../icons'

import styles from './EmployeeModal.module.css'

const EmployeeModal = () => {
    const [employeeToDisplay, setEmployeeToDisplay] = useState(null)

    // eslint-disable-next-line no-unused-vars
    const {refresh, setRefresh, setActiveEmployee} = useOutletContext()
    const {employeeId} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(`/Employee/${employeeId}`)
            .then(res => {
                if(200 >= res.status < 300){
                    setEmployeeToDisplay(res.data)
                }
            }).catch(err => toast.error(err.message))
    }, [refresh, employeeId])

    const exitModal = useCallback(() => {
        setActiveEmployee(null)
        navigate('/employees')
    }, [ navigate ])

    // useEffect(() => {
    //     let timer 
    //         // this check stops this from running on the first render 
    //         if(productToDisplay && quantity != productToDisplay.quantity){
    //             timer = setTimeout(() => {
    //                 axios.put(`/Inventory/${productId}/${locationId}`, {
    //                     productId: productId,
    //                     locationId: locationId,
    //                     quantity: quantity
    //                 }).then(res => {
    //                     if(200 >= res.status < 300){
    //                         toast.success(`${productToDisplay.productName} quantity updated`)
    //                         //refresh products page data
    //                         setRefresh(x => !x)
    //                     }
    //                 }).catch(err => toast.error(err.message))
    //             }, 1000)
    //         }


    //     return () => {
    //         clearTimeout(timer)
    //     }

    // }, [quantity, productToDisplay, setRefresh, productId, locationId])

    if(!employeeToDisplay) return null

    return (
        <div className={styles.modalContainer} onClick={exitModal}>
            <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
                <button 
                    aria-label='Close Modal. Go back to list' 
                    className={styles.backBtn} 
                    onClick={exitModal}>
                    <Close className={styles.backBtnX} />
                    <ChevronDown className={styles.backBtnChevron} />
                    <span>Back</span>
                </button>
                <div className={styles.modalHeader}>
                    <h1 className={styles.h1}>{employeeToDisplay.firstName} {employeeToDisplay.lastName}</h1>
                    <div className={styles.locationContainer}>
                        <p>Location</p>
                        <p>{employeeToDisplay.jobTitle}</p>
                        <p>{employeeToDisplay.employeeId}</p>
                    </div>
                </div>
                <div className={styles.detailsParent}>
                    {/* <DetailsSection
                        content={details.productDetailsContent}
                        title='Product Details' />
                    <DetailsSection
                        content={details.productDescriptionsContent}
                        title='Product Descriptions'/> */}
                </div>
            </div>
        </div>
    )
}

export default EmployeeModal