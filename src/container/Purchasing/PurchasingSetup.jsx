import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { colors } from "../../utilities"

function PurchasingSetup(){


    return(
        <div>
            <SectionHeader 
                title='Purchasing'
                color={colors.green}
                firstButton='Vendors'
                secondButton='Orders'
                buttonDontShow={false}
            />
        </div>
    )
}

export default PurchasingSetup;