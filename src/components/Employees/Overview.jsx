import { useContext, useEffect, useState, useMemo } from 'react'
import PageContext from '../../context/PageContext'
import { Outlet, useParams } from 'react-router'

import axios from '../../api/axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import EmployeeHeader from './EmployeeHeader'
import EmployeeRow from './EmployeeRow'

import styles from './Overview.module.css'
import { colors } from '../../utilities'
import Loading from '../utils/Loading'
import clsx from 'clsx'

import sortedArray from '../../container/SortBy/Sortby'

const Overview = () => {
    const [activeEmployee, setActiveEmployee] = useState(null)
    const [employees, setEmployees] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)

    const {setShowSearch, filter} = useContext(PageContext)
    const {employeeId} = useParams()

    //Sorting 
        const [newArray, setNewArray] = useState(false);
        const [sortedBy, setSortedBy] = useState("");
        const [sortDirection, setSortDirection] = useState(false);

    useEffect(() => {
            setSortDirection(false);
        }, [sortedBy]);
    
    useEffect(() => {

    }, [newArray, sortedBy]);
    
    //

    let filteredEmployees = useMemo(() =>{
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

    //sorting function
    const handleSortChange = (name, dataType) => {
        sortedArray(filteredEmployees, name, dataType, sortDirection);

        setSortedBy(name);
        setSortDirection(x => !x);
        setNewArray(x => !x);
    }

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
    if (loading) return <Loading color={colors.orange} />

    if(!employees) return <>Something went wrong, please reload page</>

    return(
        <>
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}
            className={clsx(styles.employeeList,
            employeeId && styles.ModalIsOpen,
        )}>
            <EmployeeHeader handleSort={handleSortChange}/>
            {filteredEmployees.map((employee) => (
               <EmployeeRow 
                key={employee.employeeId} 
                employee={employee} 
                setActiveEmployee={setActiveEmployee} />
            ))}
        </motion.div>
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