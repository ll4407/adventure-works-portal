import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";
import HeaderSearch from "./HeaderSearch"; 

import styles from './SectionHeader.module.css';


const SectionHeader =({title, color, firstButton, secondButton, onChange}) =>{
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
                    onChange={onChange}
                />
                <HeaderSearch />
            </div>
        </>
    )
}

export default SectionHeader