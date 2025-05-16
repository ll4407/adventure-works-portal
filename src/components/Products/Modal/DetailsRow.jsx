import styles from './ProductModal.module.css'
const DetailsRow = ({label, value}) =>{
    return (
        <div className={styles.detailsRow}>
            <p className={styles.modalText}>{label}</p>
            <p className={styles.modalText}>{value ?? "--"}</p>
        </div>

    )
}
export default DetailsRow