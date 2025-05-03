import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Layout from "../../components/Layout/Layout"

function Employees(){
    return(
        <Layout>
            <SectionHeader
                title={"Employees"}
                color={"orange"}
                firstButton={"Overview"} />
        </Layout>
    )
}

export default Employees;