import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { colors } from "../../utilities"

function SaleSetup(){


    return(
        <div>
            <SectionHeader 
                title='Sales'
                color={colors.pink}
                firstButton='Customers'
                secondButton='Stores'
                buttonDontShow={false}
            />
        </div>
    )
}

export default SaleSetup;