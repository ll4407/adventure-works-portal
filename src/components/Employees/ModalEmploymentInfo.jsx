import { useState } from 'react'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { Edit } from '../../icons'

import styles from './EmployeeModal.module.css'

function ModalEmploymentInfo({employee, setRefresh}) {
    const [editing, setEditing] = useState(false)

    const currentShift = employee.shiftHistory.filter(shift => shift.endDate === null)[0]
    
    const defaultValues = {
        jobTitle: employee.jobTitle,
        employeeId: employee.employeeId,
        department: currentShift.departmentName,
        shift: currentShift.shiftName,
        startDate: currentShift.startDate,
        endDate: currentShift.endDate,
    }

    const [employeeData, setEmployeeData] = useState(defaultValues)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(employeeData.firstName !== employee.firstName || 
            employeeData.lastName !== employee.lastName ||
            employeeData.middleName !== employee.middleName ||
            employeeData.suffix !== employee.suffix
        ){
            axios.put(`/Employee/employment/${employee.employeeId}`, employeeData)
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
                    setEmployeeData(prev =>({...prev, employeeId: e.target.value}))} />
            <input
                aria-label='Department'
                type="text"
                value={employeeData.department}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, department: e.target.value}))} />
            <input
                aria-label='Shift'
                type="text"
                value={employeeData.shift}
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, shift: e.target.value}))} />
            <input
                aria-label='Start Date'
                type="date"
                value={employeeData.startDate}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, startDate: e.target.value}))} />
            <input
                aria-label='End Date'
                type="date"
                value={employeeData.endDate}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, endDate: e.target.value}))} />
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
                <h2 className={styles.h2}>Employment Information</h2>
                <button 
                    aria-label='Edit Employee Personal Information' 
                    className={styles.editBtn} 
                    onClick={() => setEditing(true)}>
                    <Edit className={styles.editIcon} />
                </button>
            </div>
            <div className={styles.detailsRow}>
                <p>Job Title</p>
                <p>{employee.jobTitle}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Employee ID</p>
                <p>{employee.employeeId}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Department</p>
                <p>{employee.shiftHistory.department}</p>
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

export default ModalEmploymentInfo