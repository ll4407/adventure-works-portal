import { useState, useCallback } from 'react';
import styles from './SectionHeader.module.css';
import 'font-awesome/css/font-awesome.min.css';


function headerSearch(){
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
                    <button type='submit'>send</button>
                </div>
            </form>
        </div>
    )}

export default headerSearch;