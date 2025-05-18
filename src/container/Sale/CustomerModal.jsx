import { useOutletContext, useParams } from "react-router";
import { ChevronDown } from "../../icons"
import styles from "./Sales.module.css";
import Customer from "../../components/Sale/Customer";

function CustomerModal() {
    const {id} = useParams()
    const { closeDetail, updateSalesAfterChange } = useOutletContext();
    console.log("CustomerModal", id)
    return (
                <>
                    <button className={styles.backButton} onClick={closeDetail}>
                        <ChevronDown className={styles.chevron} /> 
                        Back
                    </button>
                    <Customer
                        selectedSaleId={id}
                        onClose={closeDetail}
                        onUpdate={updateSalesAfterChange}
                        />
                </>
    )
}

export default CustomerModal