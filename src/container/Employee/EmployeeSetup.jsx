import SectionTitle from "../../components/SectionHeader/HeaderTitle";
import SectionButton from "../../components/SectionHeader/HeaderButton";
import SectionSearch from "../../components/SectionHeader/HeaderSearch"; 

import styles from '../../components/SectionHeader/SectionHeader.module.css';

function EmployeeSetup(){
    return(
        <div className={styles.headerInfo}>
            <SectionTitle 
                title='Employees'
                color='orange'
            />
            <div>
                <SectionButton
                    color='orange'
                    firstButton='Overview'
                    secondButton='Blank'
                    buttonDontShow={true}
                />
                <SectionSearch />
            </div>
        </div>
    )
}

export default EmployeeSetup;