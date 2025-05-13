import styles from '../../container/Products/Products.module.css'
const DetailsRow = ({label, value}) =>{
    return (
        <div className={styles.detailsRow}>
            <p>{label}</p>
            <p>{value}</p>
        </div>

    )
}
export default DetailsRow