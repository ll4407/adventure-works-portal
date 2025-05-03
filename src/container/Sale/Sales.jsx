import Layout from "../../components/Layout/Layout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

function Sales(){


    return(
        <Layout>
            <SectionHeader
                title={"Sales"}
                color={"pink"}
                firstButton={'Customers'}
                secondButton={'Stores'}/>
        </Layout>
    )
}

export default Sales;