import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";
import HeaderSearch from "./HeaderSearch"; 

import styles from './SectionHeader.module.css';


const SectionHeader =({title, color, firstButton, secondButton, onTabChange}) =>{
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
                    onTabChange={onTabChange}
                />
                <HeaderSearch />
            </div>
        </div>
    )
}

export default SectionHeader