import styles from './SectionHeader.module.css';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {Dot} from '../../icons'
import {colors} from '../../utilities'

function SectionHeader(props){
    const [searchRequest, setSearchRequest] = useState('');
	const [background, setBackground] = useState(1);

    const inner = {
        backgroundColor: props.color
    }
    const outer = {
        borderColor: props.color
    }
    const trans = {
        backgroundColor: props.color2
    }
    

    // useEffect(() => {
    //     if(window.matchMedia('(min-width: 60rem)').matches){
    //         console.log('dsadasd');
    //         setBackground(0);
    //     }else{
    //         console.log('MRewo');
    //         setBackground(1);
    //     }
	// }, [background]);
    window.addEventListener('resize',() =>{ 
        if(window.matchMedia('(min-width: 60rem)').matches){
            console.log('dsadasd');
            setBackground(0);
        }else{
            console.log('MRewo');
            setBackground(1);
        }
    })

    const handleSubmit = useCallback((evt) => {
		evt.preventDefault();
		alert(`Search = ${searchRequest}`);

	}, [searchRequest]);

    return (
        <div className={styles.headerInfo}>
            <h1 style={background == 1 ? inner : trans} className={`${styles[props.color]} ${styles.title}`}>{props.title}</h1>

            <button>
                <Dot color={colors[props.color.toLowerCase()]} />
                {props.firstButton}
            </button>
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