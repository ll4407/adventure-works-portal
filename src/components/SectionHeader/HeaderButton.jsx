import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useCallback, useContext } from 'react';
import styles from './SectionHeader.module.css'
import PageContext from '../../context/PageContext';

function HeaderButton(props){
    const {activePage, setActivePage} = useContext(PageContext)

    const handlePageChange = useCallback((page) =>{
        setActivePage(page)
    }, [setActivePage]);

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