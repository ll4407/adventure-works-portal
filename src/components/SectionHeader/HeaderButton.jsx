import styles from './SectionHeader.module.css';
import {Dot} from '../../icons'
import {colors} from '../../utilities'
import { useCallback, useState } from 'react';

function headerButton(props){
    //Keeps Track of active button
    const [button1active, setButton1Active] = useState(true);

    const handleButtonChange = useCallback((button) =>{
        if(button == 1){
            setButton1Active(true);
        }else{
            setButton1Active(false)
        }
    }, []);


    //These are two different layouts base on active button
    const layout1 = (
        <div>
            <button onClick={() => handleButtonChange(1)}>
                <Dot color={colors[props.color.toLowerCase()]} />
                <span>{props.firstButton}</span>
            </button>

            <button onClick={() => handleButtonChange(2)}
                className={props.buttonDontShow === true ? styles.false : ''}
                disabled={props.buttonShow}>
                    <span>{props.secondButton}</span>
            </button>
        </div>
    );
    const layout2 = (
        <div>
            <button onClick={() => handleButtonChange(1)}>
                <span>{props.firstButton}</span>
            </button>

            <button onClick={() => handleButtonChange(2)}
                className={props.buttonDontShow === true ? styles.false : ''}
                disabled={props.buttonShow}>
                    <Dot color={colors[props.color.toLowerCase()]} />
                    <span>{props.secondButton}</span>
            </button>
        </div>
    );

    //sets content
    let content = layout1;

    if(!button1active){
        content = layout2;
    }

    //display content
    return(
        <div>{content}</div>
    )
}

export default headerButton;