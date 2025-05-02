import { useState, useCallback } from 'react';
import styles from './SectionHeader.module.css';
import 'font-awesome/css/font-awesome.min.css';
import { Search } from '../../icons';


function HeaderSearch(){
    const [searchRequest, setSearchRequest] = useState('');
    
    const handleSubmit = useCallback((evt) => {
		evt.preventDefault();
		alert(`Search = ${searchRequest}`);

	}, [searchRequest]);

    return(
        <div className={styles.searchBar}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='search'>
                        <input type="text" id='search' value={searchRequest} onChange={evt => setSearchRequest(evt.target.value)} />
                    </label>
                    <button aria-label='search' type='submit'>
                        <Search size={20} />
                    </button>
                </div>
            </form>
        </div>
    )}

export default HeaderSearch;