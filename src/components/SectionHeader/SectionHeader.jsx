import styles from './SectionHeader.module.css';
import { useState } from 'react';
import { useCallback } from 'react';

function SectionHeader(props){
    const inner = {
        backgroundColor: props.color
    }
    const transparent = {
        backgroundColor: props.color2
    }
    const outer = {
        borderColor: props.color
    }

	const [searchRequest, setSearchRequest] = useState('');


    const handleSubmit = useCallback((evt) => {
		evt.preventDefault();
		alert(`Search = ${searchRequest}`);

	}, [searchRequest]);

    return (
        <div className={styles.headerInfo}>
            <h1 style={window.matchMedia('(max-width: 768px)').matches ? inner : transparent}>{props.title}</h1>

            <button><div className={styles.circle} style={outer}><p style={inner}></p></div>{props.firstButton}</button>
            <button className={props.buttonDontShow === true ? styles.false : ''}
            disabled={props.buttonShow}>{props.secondButton}</button>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='search'>
                        <input type="text" id='search' value={searchRequest} onChange={evt => setSearchRequest(evt.target.value)} />
                    </label>
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default SectionHeader;