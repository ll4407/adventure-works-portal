import React from "react";
import styles from "../Store.module.css";

export default function ContactsForm({
  fields,
  register,
  handleSubmit,
  onSubmit,
  reset,
  setIsEditing,
  storeDetails,
  phoneNumberTypes,
  contactTypes,
}) {
  return (
    <section className={styles.contacts}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contactsForm}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.contactRow}>
            <span className={styles.contactNumber}>{index + 1}.</span>
            <div className={styles.contactForm}>
              <div className={styles.gridRow}>
                <select
                  {...register(`contacts.${index}.suffix`)}
                  defaultValue={field.suffix || ""}
                >
                  <option value="">Suffix</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                <input
                  {...register(`contacts.${index}.firstName`)}
                  placeholder="First Name"
                  defaultValue={field.firstName}
                />
                <input
                  {...register(`contacts.${index}.middleName`)}
                  placeholder="Middle Name"
                  defaultValue={field.middleName}
                />
                <input
                  {...register(`contacts.${index}.lastName`)}
                  placeholder="Last Name"
                  defaultValue={field.lastName}
                />
              </div>
              <div className={styles.gridRow}>
                <div className={styles.group}>
                  <select
                    {...register(`contacts.${index}.contactType`)}
                    defaultValue={field.contactType || ""}
                  >
                    <option value="">Contact Type</option>
                    {contactTypes.map((type) => (
                      <option
                        key={type.contactTypeId}
                        value={type.contactTypeName}
                      >
                        {type.contactTypeName}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register(`contacts.${index}.title`)}
                    defaultValue={field.title || ""}
                  >
                    <option value="">Contact Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className={styles.group}>
                  <select
                    {...register(`contacts.${index}.phoneNumberType`)}
                    defaultValue={field.phoneNumberType || ""}
                  >
                    {phoneNumberTypes.map((type) => (
                      <option
                        key={type.phoneNumberTypeId}
                        value={type.phoneNumberTypeName}
                      >
                        {type.phoneNumberTypeName}
                      </option>
                    ))}
                  </select>

                  <input
                    {...register(`contacts.${index}.phoneNumber`)}
                    placeholder="Phone Number"
                    defaultValue={field.phoneNumber}
                  />
                </div>
                <input
                  {...register(`contacts.${index}.emailAddress`)}
                  placeholder="Email"
                  defaultValue={field.emailAddress}
                />
              </div>
            </div>
          </div>
        ))}
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
          <div>
            <a
              onClick={() => {
                reset({ contacts: storeDetails.contacts });
                setIsEditing(false);
              }}
            >
              Cancel
            </a>
          </div>
        </div>
      </form>
    </section>
  );
}
