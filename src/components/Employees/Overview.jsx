import { useContext, useEffect, useState, useMemo } from 'react'
import PageContext from '../../context/PageContext'
import { Outlet, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'

import EmployeeHeader from './EmployeeHeader'
import EmployeeRow from './EmployeeRow'

import styles from './Overview.module.css'
import clsx from 'clsx'

const Overview = () => {
    const [activeEmployee, setActiveEmployee] = useState(null)
    const [employees, setEmployees] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)

    const {setShowSearch, filter} = useContext(PageContext)
    const {employeeId} = useParams()

    const filteredEmployees = useMemo(() =>{
        if(!employees) return []
        if(!filter) return employees

        const lowered = filter.toLowerCase()
        return employees.filter(e =>
            e.firstName.toLowerCase().includes(lowered) ||
            e.lastName.toLowerCase().includes(lowered) ||
            e.shift.toLowerCase().includes(lowered) ||
            e.department.toLowerCase().includes(lowered) ||
            e.jobTitle.toLowerCase().includes(lowered)
        )
    }, [filter, employees])

    useEffect(() =>{
        axios.get('/Employee')
            .then(res => setEmployees(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(() => setLoading(false))
    }, [refresh])
    
    //modal clean up
    useEffect(() => {
        if (!loading) {
            setShowSearch(prev => {
                const desired = !activeEmployee;
                return prev === desired ? prev : desired;
            });
        }
    }, [activeEmployee, setShowSearch, loading])

    if(loading || !employees) return null

    return(
        <>
        <div className={clsx(styles.employeeList,
            employeeId && styles.ModalIsOpen,
        )}>
            <EmployeeHeader />
            {filteredEmployees.map((employee) => (
               <EmployeeRow 
                key={employee.employeeId} 
                employee={employee} 
                setActiveEmployee={setActiveEmployee} />
            ))}
        </div>
        <Outlet 
            context={{
                setActiveEmployee:setActiveEmployee,
                refresh: refresh,
                setRefresh: setRefresh,
                }} />
        </>
    )
}

export default Overview