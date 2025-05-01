import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { colors } from "../../utilities"

function EmployeeSetup(){


    return(
        <div>
            <SectionHeader 
                title='Employees'
                color={colors.orange}
                color2={colors.white}
                firstButton='Overview'
                secondButton='Blank'
                buttonDontShow={true}
            />
        </div>
    )
}

export default EmployeeSetup;