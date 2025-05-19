import DetailsColumn from "./DetailsColumn"
import DetailsRow from "./DetailsRow"

import styles from './ProductModal.module.css'

function DetailsSection({content, title, containerClassName}) {
  return (
        <div className={containerClassName ?? styles.detailsSection}>
            <h2>{title}</h2>
            {content.map((item, index) => (
                item.column ? (
                    <DetailsColumn
                        key={title + index}
                        label={item.label}
                        value={item.value} />
                ) : (
                    <DetailsRow
                        key={title +index}
                        label={item.label}
                        value={item.value} />
                )
            ))}
        </div>
  )
}

export default DetailsSection