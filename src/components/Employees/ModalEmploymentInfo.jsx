import { useCallback, useState } from 'react'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { Edit } from '../../icons'

import styles from './EmployeeModal.module.css'

function ModalEmploymentInfo({employee, setRefresh, departments, shifts}) {
    const [editing, setEditing] = useState(false)

    const currentShift = employee.shiftHistory.find(shift => shift.endDate === null)
    
    const defaultValues = {
        title: employee.jobTitle,
        employeeNumber: employee.employeeNumber,
        departmentId: currentShift.departmentId,
        departmentTitle: currentShift.departmentName,
        shift: currentShift.shiftName,
        shiftId: currentShift.shiftId,
        startDate: currentShift.startDate,
        endDate: currentShift.endDate,
    }

    const [employeeData, setEmployeeData] = useState(defaultValues)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const objectToSend = {
            title: employeeData.title,
            employeeNumber: employeeData.employeeNumber,
            departmentId: employeeData.departmentId,
            shiftId: employeeData.shiftId,
            startDate: employeeData.startDate,
            endDate: employeeData.endDate
        }
        axios.put(`/Employee/employment/${employee.employeeId}`, objectToSend)
            .then(res => {
                if(200 >= res.status < 300){
                    toast.success('Employee updated successfully')
                    setEditing(false)
                    setRefresh(x => !x)
                    }
                })
            .catch(err => toast.error(err.message))
    }, [employee, employeeData, setRefresh])
    
  return (  
    <div className={styles.modalSection}>
        {editing 
        ? 
        <form className={styles.detailsSection} onSubmit={handleSubmit}>
            <input
                aria-label='Title'
                type="text"
                value={employeeData.title}
                onChange={(e) => 
                    setEmployeeData(prev => ({...prev, title: e.target.value}))} />
            <input
                aria-label='Employee ID'
                type="text"
                value={employeeData.employeeNumber}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, employeeNumber: e.target.value}))} />
            <select
                aria-label='Department'
                className={styles.formSelect}
                value={employeeData.departmentId}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, 
                    departmentId: e.target.value, 
                    departmentTitle: departments.find(d => d.departmentId == e.target.value).name}))} >
                {departments.map(department => (
                    <option
                        key={department.departmentId} 
                        value={department.departmentId}
                        >
                        {department.name}</option>
                ))}
            </select>
            <select
                aria-label='Shift'
                type="text"
                value={employeeData.shiftId}
                className={styles.formSelect}
                onChange={(e) => 
                    setEmployeeData(prev => ({
                        ...prev, 
                        shiftId: e.target.value, 
                        shift: shifts.find(s => s.shiftId == e.target.value).name}))} >
                {shifts.map(shift => 
                    (<option key={shift.shiftId} value={shift.shiftId}>
                        {shift.name}
                    </option>))}
            </select>
            <input
                aria-label='Start Date'
                type="datetime-local"
                value={employeeData.startDate}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, startDate: e.target.value}))} />
            <input
                aria-label='End Date'
                type="datetime-local"
                value={employeeData.endDate || ''}
                onChange={(e) => 
                    setEmployeeData(prev =>({...prev, endDate: e.target.value}))} />
            <button 
                className={styles.submitBtn} 
                type='submit'
                >Save Changes
            </button>
            <button 
                className={styles.cancelBtn} 
                type='button' 
                onClick={() => setEditing(false)}
                >Cancel
            </button>
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
                <p>Employee Number</p>
                <p>{employee.employeeNumber}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Department</p>
                <p>{currentShift.departmentName}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Shift</p>
                <p>{currentShift.shiftName}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Start Date</p>
                <p>{new Date(currentShift.startDate).toLocaleDateString()}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>End Date</p>
                <p>{currentShift.endDate || '--'}</p>
            </div>
        </div>
        }
    </div>
  )
}

export default ModalEmploymentInfo