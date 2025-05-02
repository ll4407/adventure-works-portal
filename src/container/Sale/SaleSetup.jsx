import SectionTitle from "../../components/SectionHeader/HeaderTitle";
import SectionButton from "../../components/SectionHeader/HeaderButton";
import SectionSearch from "../../components/SectionHeader/HeaderSearch"; 

import styles from '../../components/SectionHeader/SectionHeader.module.css';

import { colors } from "../../utilities";

function SaleSetup(){


    return(
        <div className={styles.headerInfo}>
            <SectionTitle 
                title='Sales'
                color='pink'
            />
            <SectionButton
                color='pink'
                firstButton='Customers'
                secondButton='Stores'
                buttonDontShow={false}
            />
            <SectionSearch />
        </div>
    )
}

export default SaleSetup;