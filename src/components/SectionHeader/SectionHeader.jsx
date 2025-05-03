import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";
import HeaderSearch from "./HeaderSearch"; 

import styles from './SectionHeader.module.css';


const SectionHeader =({title, color, firstButton, secondButton}) =>{
    return (
        <div className={styles.headerInfo}>
            <HeaderTitle 
                title={title}
                color={color}
            />
            <div>
                <HeaderButton
                    color={color}
                    firstButton={firstButton}
                    secondButton={secondButton}
                />
                <HeaderSearch />
            </div>
        </div>
    )
}

export default SectionHeader