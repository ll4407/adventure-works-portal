import Layout from "../../components/Layout/Layout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

function Product(){


    return(
        <Layout>
            <SectionHeader
                title={"Products"}
                color={"blue"}
                firstButton={'Inventory'}
                secondButton={'Catalog'}/>
        </Layout>
    )
}

export default Product;