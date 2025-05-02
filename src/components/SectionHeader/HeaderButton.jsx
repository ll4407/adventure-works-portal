import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useCallback, useState } from 'react';
import styles from './SectionHeader.module.css'

function HeaderButton(props){
    //Keeps Track of active button
    const [button1active, setButton1Active] = useState(true);

    const handleButtonChange = useCallback((button) =>{
        if(button == 1){
            setButton1Active(true);
        }else{
            setButton1Active(false)
        }
    }, []);

    //display content
    return(
        <div className={styles.buttonContainer}>
            <button className={styles.headerButton} onClick={() => handleButtonChange(1)}>
                {button1active && <Dot color={colors[props.color.toLowerCase()]} />}
                <span>{props.firstButton}</span>
            </button>
            {props.secondButton && (
                <button className={styles.headerButton} onClick={() => handleButtonChange(2)}>
                        {!button1active && <Dot color={colors[props.color.toLowerCase()]} />}
                        <span>{props.secondButton}</span>
                </button>
            )
            }
        </div>
    )
}

export default HeaderButton;