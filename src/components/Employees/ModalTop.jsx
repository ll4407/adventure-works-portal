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
        employeeId: employee.employeeId
    })

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
            }
            if(employeeData.jobTitle !== employee.jobTitle || 
                employeeData.employeeId !== employee.employeeId){
                axios.put(`/Employee/employment/${employee.employeeId}`, {
                        jobTitle: employeeData.jobTitle,
                        employeeId: employeeData.employeeId
                    })
                    .then(res => {
                        if(200 >= res.status < 300){
                            toast.success('Employee updated successfully')
                            setEditing(false)
                            setRefresh(x => !x)
                            }
                        })
            }
        }catch(err){
            toast.error(err.message)
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
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, firstName: e.target.value}))} />
            <input
                aria-label='Last Name'
                type="text"
                value={employeeData.lastName}
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, lastName: e.target.value}))} />
            <input
                aria-label='Job Title'
                type="text"
                value={employeeData.jobTitle}
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, jobTitle: e.target.value}))} />
            <input
                aria-label='Employee ID'
                type="text"
                value={employeeData.employeeId}
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, employeeId: e.target.value}))} />
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
        <div className={styles.modalHeader}>
            <h1 className={styles.h1}>{employee.firstName} {employee.lastName}</h1>
            <button 
                aria-label='Edit Employee' 
                className={styles.editBtn} 
                onClick={() => setEditing(true)}>
                <Edit className={styles.editIcon} />
            </button>
            <div>
                <p>{employee.jobTitle}</p>
                <p>{employee.employeeId}</p>
            </div>
        </div>
        }
    </>
  )
}

export default ModalTop