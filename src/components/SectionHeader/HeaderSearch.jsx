import { useEffect, useContext, useCallback } from 'react';
import styles from './SectionHeader.module.css';
import { Search } from '../../icons';
import PageContext from '../../context/PageContext';


function HeaderSearch(){

    const {filter, setFilter} = useContext(PageContext)

    const handleSearch = useCallback(() => {
        if(filter){
            alert('new filter = ', filter)
        }
    }, [filter])

    useEffect(() =>{

        const timer = setTimeout(()=>{

            handleSearch()

        }, 500)

        return () => clearTimeout(timer)

    },[filter, handleSearch])

    return(
        <div className={styles.headerSearch}>
            <form onSubmit={(evt) => {
                evt.preventDefault()
                handleSearch()
            }}>
                <div>
                    <label htmlFor='search'>
                        <input type="text" id='search' value={filter} onChange={evt => setFilter(evt.target.value)} />
                    </label>
                    <button aria-label='search' type='submit'>
                        <Search size={24} />
                    </button>
                </div>
            </form>
        </div>
    )}

export default HeaderSearch;