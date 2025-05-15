import {Dot} from '../../icons'
import {colors} from '../../utilities'
import React, { useContext } from 'react';
import styles from './SectionHeader.module.css'
import PageContext from '../../context/PageContext';
import { useLocation, useNavigate } from 'react-router';

function HeaderButton({firstButton, secondButton, color}){
    const { firstBtnUrl, secondBtnUrl } = useContext(PageContext)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const firstBtnActive = React.memo(() => {
        // this logic is weird specifically to make the employee page work
        // where the route name won't match overview
        if(!secondButton) return true

        if(pathname.toLowerCase().includes(secondButton.toLowerCase())){
            return false
        }
        
        return true

        }, [])

    return(
        <div className={styles.buttonContainer}>
            <button 
                className={styles.headerButton} 
                onClick={() => navigate(firstBtnUrl)}>
                {firstBtnActive && 
                    <Dot size={24} color={colors[color.toLowerCase()]} />}
                <span>{firstButton}</span>
            </button>
            {secondButton && (
                <button 
                    className={styles.headerButton} 
                    onClick={() => navigate(secondBtnUrl)}>
                        {!firstBtnActive && 
                            <Dot color={colors[color.toLowerCase()]} />}
                        <span>{secondButton}</span>
                </button>
            )}
        </div>
    )
}

export default HeaderButton;