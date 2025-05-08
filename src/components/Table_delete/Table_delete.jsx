import React from 'react'
// import styles from './Table.module.css'

/**
 * A generic, reusable table component.
 *
 * Props:
 * - rows: Array of data objects, each must have a unique `id`.
 * - columns: Array of { key: string, label: string } defining which fields to show.
 * - onRowClick: Optional callback invoked when a row is clicked: (row) => void
 */
export default function Table({ rows = [], columns = [], onRowClick }) {
  const hasAction = typeof onRowClick === 'function'

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            {hasAction && <th aria-label="Actions"><span className={styles.visuallyHidden}>Actions</span></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr
              key={row.id}
              className={styles.row}
              onClick={() => hasAction && onRowClick(row)}
            >
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {hasAction && <td className={styles.chevron}>&gt;</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
