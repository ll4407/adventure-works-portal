import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { ChevronDown, Close } from '../../icons'

import ModalTop from './ModalTop'
import ModalPersonalInfo from './ModalPersonalInfo'
import ModalEmploymentInfo from './ModalEmploymentInfo'

import styles from './EmployeeModal.module.css'

const EmployeeModal = () => {
    const [employeeToDisplay, setEmployeeToDisplay] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [shifts, setShifts] = useState(null)

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
        
        axios.get('/Department')
            .then(res => {
                if(200 >= res.status < 300){
                    setDepartments(res.data)
                }
            }).catch(err => toast.error(err.message))

        axios.get('/Shift')
            .then(res => {
                if(200 >= res.status < 300){
                    setShifts(res.data)
                }
            }).catch(err => toast.error(err.message))
        
    }, [refresh, employeeId])

    const exitModal = useCallback(() => {
        setActiveEmployee(null)
        navigate('/employees')
    }, [ navigate ])

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
                <ModalTop employee={employeeToDisplay} setRefresh={setRefresh} />
                <div className={styles.modalContent}>
                    <ModalPersonalInfo employee={employeeToDisplay} setRefresh={setRefresh} />
                    <ModalEmploymentInfo 
                        employee={employeeToDisplay} 
                        setRefresh={setRefresh}
                        departments={departments}
                        shifts={shifts} />
                </div>
            </div>
        </div>
    )
}

export default EmployeeModal