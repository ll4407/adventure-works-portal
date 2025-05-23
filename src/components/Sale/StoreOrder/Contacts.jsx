import React from "react";
import styles from "../Store.module.css";
import Edit from "../../../icons/Edit";

export default function Contacts({ contacts, isEditing, onEdit }) {
  return (
    <section className={styles.contacts}>
      <div className={styles.contactsHeader}>
        <h3>Contacts</h3>
        {!isEditing && (
          <button
            type="button"
            className={styles.editButton}
            onClick={onEdit}
          >
            <Edit className={styles.editIcon} />
          </button>
        )}
      </div>
      <div className={styles.contactsList}>
        {contacts?.length > 0 ? (
          contacts.map((c, i) => (
            <div key={i} className={styles.contactEntry}>
              <p>
                {i + 1}.  {c.title} {c.firstName} {c.middleName} {c.lastName} {c.suffix}
              </p>
              <p>{c.contactType}</p>
              <p>
                Phone: {c.phoneNumber} ({c.phoneNumberType})
              </p>
              <p>Email: {c.emailAddress}</p>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </section>
  );
}