import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { colors } from "../../utilities"

function ProductSetup(){


    return(
        <div>
            <SectionHeader 
                title='Products'
                color={colors.blue}
                firstButton='Inventory'
                secondButton='Catalog'
                buttonDontShow={false}
            />
        </div>
    )
}

export default ProductSetup;