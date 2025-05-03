import Layout from "../../components/Layout/Layout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";


function Purchasing(){

    return(
        <Layout>
            <SectionHeader
                title={"Purchasing"}
                color={"green"}
                firstButton={'Vendors'}
                secondButton={'Orders'}/>
        </Layout>

    )
}

export default Purchasing;