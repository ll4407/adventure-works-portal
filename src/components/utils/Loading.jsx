import styles from './Loading.module.css'

const Loading = ({color}) => {
    return(
        <div style={{color: color}} className={styles.loaderContainer}>
            <span className={styles.loader}/>
        </div>
    )
}

export default Loading