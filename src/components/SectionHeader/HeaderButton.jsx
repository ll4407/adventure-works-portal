import styles from './SectionHeader.module.css';
import {Dot} from '../../icons'
import {colors} from '../../utilities'

function headerButton(props){


    return(
        <div>
            <button>
                <Dot color={colors[props.color.toLowerCase()]} />
                {props.firstButton}
            </button>

            <button className={props.buttonDontShow === true ? styles.false : ''}
            disabled={props.buttonShow}>{props.secondButton}</button>
        </div>
    )
}

export default headerButton;