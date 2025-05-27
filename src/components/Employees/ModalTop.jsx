import { useState } from 'react'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { Edit } from '../../icons'

import styles from './EmployeeModal.module.css'

function ModalTop({employee, setRefresh}) {
    const [editing, setEditing] = useState(false)
    const [employeeData, setEmployeeData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        employeeNumber: employee.employeeNumber
    })

    const currentShift = employee.shiftHistory.find(shift => shift.endDate === null)

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            if(employeeData.firstName !== employee.firstName || 
                employeeData.lastName !== employee.lastName){
                axios.put(`/Employee/personal/${employee.employeeId}`, {
                        firstName: employeeData.firstName,
                        lastName: employeeData.lastName
                    })
                    .then(res => {
                        if(200 >= res.status < 300){
                            toast.success('Employee updated successfully')
                            setEditing(false)
                            setRefresh(x => !x)
                            }
                        })
                    .catch(err => toast.error(err.message))
            }
            if(employeeData.jobTitle !== employee.jobTitle || 
                employeeData.employeeNumber !== employee.employeeNumber){
                axios.put(`/Employee/employment/${employee.employeeId}`, {
                        title: employeeData.jobTitle,
                        employeeNumber: employeeData.employeeNumber,
                        departmentId: currentShift.departmentId,
                        shiftId: currentShift.shiftId,
                        startDate: currentShift.startDate,
                        endDate: currentShift.endDate
                    })
                    .then(res => {
                        if(200 >= res.status < 300){
                            toast.success('Employee updated successfully')
                            setEditing(false)
                            setRefresh(x => !x)
                            }
                        })
                    .catch(err => toast.error(err.message))
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    
  return (  
    <div className={styles.modalSection}>
        {editing 
        ? 
        <form className={styles.topForm}>
            <div>
                <input
                    aria-label='First Name'
                    className={styles.input}
                    type="text"
                    value={employeeData.firstName}
                    placeholder='First Name'
                    onChange={(e) => 
                        setEmployeeData(prev => ({...prev, firstName: e.target.value}))} />
                <input
                    aria-label='Last Name'
                    className={styles.input}
                    type="text"
                    value={employeeData.lastName}
                    placeholder='Last Name'
                    onChange={(e) => 
                        setEmployeeData(prev => ({...prev, lastName: e.target.value}))} />
            </div>
            <input
                aria-label='Job Title'
                className={styles.input}
                type="text"
                value={employeeData.jobTitle}
                placeholder='Job Title'
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, jobTitle: e.target.value}))} />
            <input
                aria-label='Employee Number'
                className={styles.input}
                type="text"
                value={employeeData.employeeNumber}
                placeholder='Employee Number'
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, employeeNumber: e.target.value}))} />
            <button 
                className={styles.submitBtn} 
                type='submit' 
                onClick={handleSubmit}>Save Changes</button>
            <button 
                className={styles.cancelBtn} 
                type='button' 
                aria-label='Close form without saving changes'
                onClick={() => setEditing(false)}>Cancel</button>
        </form>
        :
        <div className={styles.detailsSection}>
            <div className={styles.detailsRow}>
                <h1 className={styles.h1}>{employee.firstName} {employee.lastName}</h1>
                <button 
                    aria-label='Edit Employee' 
                    className={styles.editBtn} 
                    onClick={() => setEditing(true)}>
                    <Edit className={styles.editIcon} />
                </button>
            </div>
            <p className={styles.modalText}>{employee.jobTitle}</p>
            <p className={styles.modalText}>{employee.employeeNumber}</p>
        </div>
        }
    </div>
  )
}

export default ModalTop