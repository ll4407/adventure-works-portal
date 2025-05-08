import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useCallback, useContext } from 'react';
import styles from './SectionHeader.module.css'
import PageContext from '../../context/PageContext';

function HeaderButton(props){
<<<<<<< HEAD

    const [button1active, setButton1Active] = useState(true);

    const handleButtonChange = useCallback((button) =>{
        if(button == 1){
            setButton1Active(true);
            props.onTabChange(0); // Notify parent that the first button  is active
        }else{
            setButton1Active(false)
            props.onTabChange(1); // Notify parent that the second button is active
        }
    }, []);


=======
    const {activePage, setActivePage, setShowSearch} = useContext(PageContext)

    const handlePageChange = useCallback((page) =>{
        setActivePage(page)
        setShowSearch(true)
    }, [setActivePage, setShowSearch]);

>>>>>>> origin/main
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