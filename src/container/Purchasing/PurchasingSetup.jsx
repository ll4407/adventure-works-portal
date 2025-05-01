import SectionHeader from "../../components/SectionHeader/SectionHeader";

function PurchasingSetup(){


    return(
        <div>
            <SectionHeader 
                title='Purchasing'
                color="Green"
                firstButton='Vendors'
                secondButton='Orders'
                buttonDontShow={false}
            />
        </div>
    )
}

export default PurchasingSetup;