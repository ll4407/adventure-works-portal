import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import SaleCard from "../../components/Sale/SaleCard";
import styles from "./Sale.module.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

export default function Sale() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/Order/customer")
      .then(({ data }) => setSales(data))
      .catch((err) => toast.error(err.toString()));
  }, []);

  const onCardClick = useCallback((id) => navigate(`/sales/${id}`), [navigate]);

  return (
    <>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
        onSearch={(term) => console.log("Search term:", term)} // ToDo: Handle search
      />
      <div className={styles.container}>
        {/* header row */}
        <div className={styles.headerRow}>
          <span>Customer</span>
          <span>Order Date</span>
          <span>Order #</span>
          <span>Qty</span>
          <span>Ship Date</span>
          <span>Unit Price</span>
          <span>Total Due</span>
          <span></span>
        </div>

        {/* list of sale cards */}
        <div className={styles.list}>
          {sales.map((o) => (
            <SaleCard
              key={o.id}
              id={o.id}
              firstName={o.firstName}
              lastName={o.lastName}
              orderDate={o.orderDate}
              orderNumber={o.orderNumber}
              orderQty={o.orderQty}
              unitPrice={o.unitPrice}
              lineTotal={o.lineTotal}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// import SectionHeader from "../../components/SectionHeader/SectionHeader";
// import Inventory from "./Inventory";
// import Catalog from "./Catalog";
// import Loading from "../../components/utils/Loading";
// import PageContext from "../../context/PageContext";

// import { useState, useEffect } from "react";
// import axios from '../../api/axios'
// import { toast } from "react-toastify";

// import styles from './Products.module.css'
// import usePageContext from "../../hooks/usePageContext";

// export default function Products(){

//     const pageContext = usePageContext("Inventory")
//     const [products, setProducts] = useState(null)
//     const [filteredProducts, setFilteredProducts] = useState([])
//     const [loading, setLoading] = useState(true)

//     const {filter, activePage} = pageContext

//     useEffect(() =>{
//         axios.get('/Inventory')
//             .then(res => setProducts(res.data))
//             .catch(err => {
//                 toast.error(err.toString())
//             })
//             .finally(() =>{
//                 setLoading(false)
//             })
//     }, [])

//     useEffect(()=>{
//         let timer;
//         if(filter){
//             timer = setTimeout(() =>{
//                 const loweredFilter = filter.toLowerCase()
//                 const newFilteredProducts = products.filter(prod =>
//                     prod.productName.toLowerCase().includes(loweredFilter) ||
//                     prod.locationName.toLowerCase().includes(loweredFilter) ||
//                     prod.shelf.toLowerCase().includes(loweredFilter)
//                 )
//                 setFilteredProducts(newFilteredProducts)
//             }, 500)
//         }else{
//             if(products?.length){
//                 setFilteredProducts(products)
//             }
//         }

//         return () => clearTimeout(timer)

//     },[filter, products])

//     return(
//         <PageContext.Provider value={pageContext}>
//             <SectionHeader
//                 title={"Products"}
//                 color={"blue"}
//                 firstButton={'Inventory'}
//                 secondButton={'Catalog'}
//                 />
//             <div className={styles.contentWrapper}>
//                 {loading && <Loading />}
//                 {activePage === "Inventory" ?
//                     <Inventory products={filteredProducts}  /> :
//                     <Catalog products={filteredProducts} />}
//             </div>
//         </PageContext.Provider>

//     )
// }
