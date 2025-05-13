import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";
import HeaderSearch from "./HeaderSearch"; 

import styles from './SectionHeader.module.css';
import { useContext } from "react";
import PageContext from "../../context/PageContext";

<<<<<<< HEAD
const SectionHeader =({title, color, firstButton, secondButton, onChange}) =>{
=======
const SectionHeader =({title, color, firstButton, secondButton}) =>{
    const {showSearch} = useContext(PageContext)
>>>>>>> main
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
                {showSearch && <HeaderSearch />}

            </div>
        </>
    )
}

export default SectionHeader