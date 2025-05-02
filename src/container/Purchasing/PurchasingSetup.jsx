import SectionTitle from "../../components/SectionHeader/HeaderTitle";
import SectionButton from "../../components/SectionHeader/HeaderButton";
import SectionSearch from "../../components/SectionHeader/HeaderSearch"; 

import styles from '../../components/SectionHeader/SectionHeader.module.css';

import { colors } from "../../utilities";

function PurchasingSetup(){


    return(
        <div className={styles.headerInfo}>
            <SectionTitle 
                title='Purchasing'
                color='green'
            />
            <div>
                <SectionButton
                    color='green'
                    firstButton='Vendors'
                    secondButton='Orders'
                    buttonDontShow={false}
                />
                <SectionSearch />
            </div>
        </div>
    )
}

export default PurchasingSetup;