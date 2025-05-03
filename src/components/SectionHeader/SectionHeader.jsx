import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";
import HeaderSearch from "./HeaderSearch"; 

import styles from './SectionHeader.module.css';


const SectionHeader =({title, color, firstButton, secondButton}) =>{
    return (
        <>
            <HeaderTitle 
                title={title}
                color={color}
            />
            <div className={styles.controls}>
                <HeaderButton
                    color={color}
                    firstButton={firstButton}
                    secondButton={secondButton}
                />
                <HeaderSearch />
            </div>
        </>
    )
}

export default SectionHeader