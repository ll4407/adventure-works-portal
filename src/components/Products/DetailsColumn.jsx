import styles from './ProductModal.module.css'

const DetailsColumn = ({label, value}) =>{
    return (
        <div className={styles.detailsColumn}>
            <p>{label}</p>
            <p>{value ?? "--"}</p>
        </div>

    )
}
export default DetailsColumn