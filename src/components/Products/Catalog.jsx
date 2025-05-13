import clsx from 'clsx'
import { ChevronDown, Delete, Edit } from '../../icons'
import CatalogModal from './CatalogModal'
import styles from '../../container/Products/Products.module.css'
import { useContext, useEffect, useState } from 'react'
import PageContext from '../../context/PageContext'
import axios from '../../api/axios'
import { toast } from 'react-toastify'

const Catalog = () =>{


    //next step set up new headers and rows for catalog products

    const {setShowSearch, filter} = useContext(PageContext)
    const [activeProduct, setActiveProduct] = useState(null)
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    //fetch
    useEffect(() =>{
        axios.get('/Product')
            .then(res => setProducts(res.data))
            .catch(err => {
                toast.error(err.toString())
            })
            .finally(setLoading(false))
    }, [])

    console.log(products)

    //filter
    useEffect(()=>{
        let timer;
        if(filter){
            timer = setTimeout(() =>{
                const loweredFilter = filter.toLowerCase()
                const newFilteredProducts = products.filter(prod =>
                    prod.name.toLowerCase().includes(loweredFilter) ||
                    prod.color.toLowerCase().includes(loweredFilter)
                )
                setFilteredProducts(newFilteredProducts)
            }, 500)
        }else{
            if(products?.length){
                setFilteredProducts(products)
            }
        }

        return () => clearTimeout(timer)

    },[filter, products])
    
    //modal clean up
    useEffect(() => {
        if(activeProduct){
            setShowSearch(false)
        }else{
            setShowSearch(true)
        }
    }, [activeProduct, setShowSearch])

    if(loading || !filteredProducts.length){
        return <></>
    }
    // const exampleProduct =  {
    //     productId: 0,
    //     name: "",
    //     productNumber: "",
    //     summary: "",
    //     thumbnailPhoto: "",
    //     thumbnailPhotoFileName: "",
    //     warranty: "",
    //     color: "",
    //     listPrice: 0,
    //   }
    return(
        <>
        <div className={styles.productList}>
            <div className={clsx(styles.catalogProductCard, styles.catalogTableHeader)}>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol1)}>
                    Image
                </p>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol2)}>
                    Product Name
                </p>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol3)}>
                    Number
                </p>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol4)}>
                    Color
                </p>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol5)}>
                    List Price
                </p>
                <p className={clsx(styles.column, styles.bold, styles.catalogCol6)}>
                    Options
                </p>
            </div>
            {filteredProducts.map(prod => (
                <button key={prod.productId + prod.productName + prod.locationId + prod.locationName} className={styles.catalogProductCard} onClick={() => setActiveProduct(prod)}>
                    <div className={clsx(styles.column, styles.catalogCol1)}>
                        <img src={prod.thumbnailPhoto} alt={prod.productName} className={styles.productImage} />
                    </div>
                    <p className={clsx(styles.column, styles.catalogCol2)}>
                        {prod.name}
                        <span>{prod.productNumber}</span>
                    </p>
                    <p className={clsx(styles.column, styles.catalogCol3)}>{prod.productNumber}</p>
                    <p className={clsx(styles.column, styles.catalogCol4)}>{prod.color}</p>
                    <p className={clsx(styles.column, styles.catalogCol5)}>{prod.listPrice}</p>
                    <div className={clsx(styles.catalogCol6)}>
                        <Edit/>
                        <Delete />
                    </div>
                    <ChevronDown size={30} className={styles.chevron} />
                </button>
            ))}
        </div>
        {activeProduct && 
            <CatalogModal 
                product={activeProduct} 
                setActiveProduct={setActiveProduct} 
                />}
        </>
    )
}

export default Catalog