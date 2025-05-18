import { useState } from 'react'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { Edit } from '../../icons'

import styles from './EmployeeModal.module.css'

function ModalPersonalInfo({employee, setRefresh}) {
    const [editing, setEditing] = useState(false)

    const defaultValues = {
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        suffix: employee.suffix,
    }

    const [employeeData, setEmployeeData] = useState(defaultValues)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(employeeData.firstName !== employee.firstName || 
            employeeData.lastName !== employee.lastName ||
            employeeData.middleName !== employee.middleName ||
            employeeData.suffix !== employee.suffix
        ){
            axios.put(`/Employee/personal/${employee.employeeId}`, employeeData)
                .then(res => {
                    if(200 >= res.status < 300){
                        toast.success('Employee updated successfully')
                        setEditing(false)
                        setRefresh(x => !x)
                        }
                    })
                .catch(err => toast.error(err.message))
        }
     
    }
    
  return (  
    <>
        {editing 
        ? 
        <form>
            <input
                aria-label='First Name'
                type="text"
                value={employeeData.firstName}
                placeholder='First Name'
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, firstName: e.target.value}))} />
            <input
                aria-label='Middle Name'
                type="text"
                value={employeeData.middleName}
                placeholder='Middle Name'
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, middleName: e.target.value}))} />
            <input
                aria-label='Last Name'
                type="text"
                value={employeeData.lastName}
                placeholder='Last Name'
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, lastName: e.target.value}))} />
            <input
                aria-label='Suffix'
                type="text"
                value={employeeData.suffix}
                placeholder='Suffix'
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, suffix: e.target.value}))} />
            <button 
                className={styles.submitBtn} 
                type='submit' 
                onClick={handleSubmit}>Save Changes</button>
            <button 
                className={styles.cancelBtn} 
                type='button' 
                onClick={() => setEditing(false)}>Cancel</button>
        </form>
        :
        <div className={styles.detailsSection}>
            <div className={styles.detailsRow}>
                <h2 className={styles.h2}>Personal Information</h2>
                <button 
                    aria-label='Edit Employee Personal Information' 
                    className={styles.editBtn} 
                    onClick={() => setEditing(true)}>
                    <Edit className={styles.editIcon} />
                </button>
            </div>
            <div className={styles.detailsRow}>
                <p>First Name</p>
                <p>{employee.firstName}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Middle Name</p>
                <p>{employee.middleName}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Last Name</p>
                <p>{employee.lastName}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Suffix</p>
                <p>{employee.suffix}</p>
            </div>
        </div>
        }
    </>
  )
}

export default ModalPersonalInfo