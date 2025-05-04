import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useCallback, useContext } from 'react';
import styles from './SectionHeader.module.css'
import PageContext from '../../context/PageContext';

function HeaderButton(props){
    const {activePage, setActivePage} = useContext(PageContext)

<<<<<<< HEAD
    const handleButtonChange = useCallback((button) =>{
        if(button == 1){
            setButton1Active(true);
            props.onChange?.(0);
        }else{
            setButton1Active(false);
            props.onChange?.(1);
        }
    }, []);
=======
    const handlePageChange = useCallback((page) =>{
        setActivePage(page)
    }, [setActivePage]);
>>>>>>> main

    return(
        <div className={styles.buttonContainer}>
            <button className={styles.headerButton} onClick={() => handlePageChange(props.firstButton)}>
                {activePage === props.firstButton && <Dot size={24} color={colors[props.color.toLowerCase()]} />}
                <span>{props.firstButton}</span>
            </button>
            {props.secondButton && (
                <button className={styles.headerButton} onClick={() => handlePageChange(props.secondButton)}>
                        {activePage === props.secondButton && <Dot color={colors[props.color.toLowerCase()]} />}
                        <span>{props.secondButton}</span>
                </button>
            )}
        </div>
    )
}

export default HeaderButton;