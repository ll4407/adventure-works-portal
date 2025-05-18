import Store from "../../components/Sale/Store";
import styles from "./Sales.module.css";
import ChevronDown from "../../icons/ChevronDown";
import { useOutletContext, useParams } from "react-router";


export default function StoreModal() {
    const { id } = useParams();
    const { closeDetail, updateSalesAfterChange} = useOutletContext();

  return (
        <>
            <button className={styles.backButton} onClick={closeDetail}>
                <ChevronDown className={styles.chevron} /> Back
            </button>
            <Store
                selectedSaleId={id}
                onClose={closeDetail}
                onUpdate={updateSalesAfterChange} // Pass the callback
                />
        </>

  );
}
