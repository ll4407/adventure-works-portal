import SectionTitle from "../../components/SectionHeader/HeaderTitle";
import SectionButton from "../../components/SectionHeader/HeaderButton";
import SectionSearch from "../../components/SectionHeader/HeaderSearch"; 

import styles from '../../components/SectionHeader/SectionHeader.module.css';

import { colors } from "../../utilities";

function ProductSetup(){


    return(
        <div className={styles.headerInfo}>
            <SectionTitle 
                title='Products'
                color='blue'
            />
            <div>
                <SectionButton
                    color='blue'
                    firstButton='Inventory'
                    secondButton='Catalog'
                    buttonDontShow={false}
                />
                <SectionSearch />
            </div>
        </div>
    )
}

export default ProductSetup;