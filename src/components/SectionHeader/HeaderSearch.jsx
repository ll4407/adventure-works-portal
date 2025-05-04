import { useContext } from 'react';
import styles from './SectionHeader.module.css';
import { Search } from '../../icons';
import PageContext from '../../context/PageContext';


function HeaderSearch(){

    const {filter, setFilter} = useContext(PageContext)

    return(
        <div className={styles.headerSearch}>
            <label className={styles.searchLabel} htmlFor='search'>
                <input 
                    type="text" 
                    id='search'
                    className={styles.searchInput}
                    value={filter} 
                    onChange={evt => setFilter(evt.target.value)} />
            </label>
            <div className={styles.searchBtn}>
                <Search size={24} />
            </div>
        </div>
    )}

export default HeaderSearch;