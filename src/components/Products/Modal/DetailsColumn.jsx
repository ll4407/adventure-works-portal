import styles from './ProductModal.module.css'

const DetailsColumn = ({label, value}) =>{
    return (
        <div className={styles.detailsColumn}>
            <p className={styles.modalText}>{label}</p>
            <p className={styles.modalText}>{value ?? "--"}</p>
        </div>

    )
}
export default DetailsColumn