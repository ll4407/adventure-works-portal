import styles from './SectionHeader.module.css';

function HeaderTitle(props) {    
     return (
            <div>
                <h1 className={`${styles[props.color]} ${styles.title}`}>{props.title}</h1>
            </div>
     )
}

export default HeaderTitle;