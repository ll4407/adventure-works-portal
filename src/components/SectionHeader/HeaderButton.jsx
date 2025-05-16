import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useContext, useMemo } from 'react';
import styles from './SectionHeader.module.css'
import PageContext from '../../context/PageContext';
import { useLocation, useNavigate } from 'react-router';

function HeaderButton({firstButton, secondButton, color}){
    const { firstBtnUrl, secondBtnUrl } = useContext(PageContext)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const firstBtnActive = useMemo(() => {
        if (!secondButton) return true;
        if (pathname === secondBtnUrl) return false;
        return true;
    }, [pathname, secondButton, secondBtnUrl])

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