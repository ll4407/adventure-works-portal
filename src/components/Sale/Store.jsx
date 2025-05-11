import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useForm, useFieldArray } from "react-hook-form";
import Edit from "../../icons/Edit";
import styles from "./Store.module.css";
import { toast } from "react-toastify";
import { Close } from "../../icons";
import Loading from "../utils/Loading"; // Import the Loading spinner

export default function Store({ selectedSaleId, onClose }) {
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: { contacts: [] },
  });
  const { fields } = useFieldArray({
    control,
    name: "contacts",
  });

  // Fetch store/order details
  useEffect(() => {
    if (!selectedSaleId) return;
    setLoading(true);
    setError(null);
    axios
      .get(`/order/store/${selectedSaleId}`)
      .then(({ data }) => {
        setStoreDetails(data);
        reset({ contacts: data.contacts || [] });
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load store details.");
      })
      .finally(() => setLoading(false));
  }, [selectedSaleId, reset]);

  // Enter edit mode
  const handleEditClick = () => setIsEditing(true);

  // Submit updated contacts
  const onSubmit = async (values) => {
    try {
      await Promise.all(
        values.contacts.map((c) =>
          axios.put(
            `/Contact/${c.businessEntityId}/${storeDetails.storeEntityId}`,
            {
              businessEntityId: c.businessEntityId,
              personId: c.personId,
              personalTitle: c.title || "",
              firstName: c.firstName,
              middleName: c.middleName,
              lastName: c.lastName,
              suffix: c.suffix,
              contactTypeId: c.contactTypeId,
            }
          )
        )
      );

      toast.success("Contacts updated successfully");
      setStoreDetails((prev) => ({
        ...prev,
        contacts: values.contacts,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Contacts update error:", err.response || err);
      toast.error("Failed to update contacts. Please try again.");
    }
  };

  if (!selectedSaleId) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <Close className={styles.close} />
        </button>

        {loading && <Loading />}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && storeDetails && (
          <>
            {/* Store Name and Order Details */}
            <header className={styles.header}>
              <h2>{storeDetails.storeName || "N/A"}</h2>
              <p>
                {storeDetails.orderDate
                  ? new Date(storeDetails.orderDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>{storeDetails.orderNumber || "N/A"}</p>
            </header>

            <div className={styles.detailsGrid}>
              {/* Sale Details */}
              <section className={styles.saleDetails}>
                <h3>Sale Details</h3>
                <div className={styles.row}>
                  <span className={styles.label}>Order Number</span>
                  <span className={styles.value}>
                    {storeDetails.orderNumber || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Tracking Number</span>
                  <span className={styles.value}>
                    {storeDetails.carrierTrackingNumber || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Order Quantity</span>
                  <span className={styles.value}>
                    {storeDetails.orderQty || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Product</span>
                  <span className={styles.value}>
                    {storeDetails.productName || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Product ID</span>
                  <span className={styles.value}>
                    {storeDetails.productId || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Unit Price</span>
                  <span className={styles.value}>
                    {storeDetails.unitPrice
                      ? storeDetails.unitPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Unit Price Discount</span>
                  <span className={styles.value}>
                    {storeDetails.unitPriceDiscount
                      ? storeDetails.unitPriceDiscount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Line Total</span>
                  <span className={styles.value}>
                    {storeDetails.lineTotal
                      ? storeDetails.lineTotal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
              </section>

              {/* Store Information */}
              <section className={styles.storeInfo}>
                <h3>Store Information</h3>
                <div className={styles.row}>
                  <span className={styles.label}>Annual Sales</span>
                  <span className={styles.value}>
                    {storeDetails.annualSales
                      ? storeDetails.annualSales.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Bank</span>
                  <span className={styles.value}>
                    {storeDetails.bankName || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Square Footage</span>
                  <span className={styles.value}>
                    {storeDetails.squareFeet || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Specialty</span>
                  <span className={styles.value}>
                    {storeDetails.specialty || "N/A"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Total Employees</span>
                  <span className={styles.value}>
                    {storeDetails.numberEmployees || "N/A"}
                  </span>
                </div>
              </section>

                         {/* Contacts Section */}
           <section className={styles.contacts}>
             <div className={styles.contactsHeader}>
               <h3>Contacts</h3>
               {!isEditing && (
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={handleEditClick}
                >
                  <Edit className={styles.editIcon} />
                </button>
              )}
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.contactsForm}
              >
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.contactRow}>
                    <select
                      {...register(`contacts.${index}.suffix`)}
                      defaultValue={field.suffix || ""}
                    >
                      <option value="">Suffix</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
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
                    <input
                      {...register(`contacts.${index}.contactType`)}
                      placeholder="Contact Type"
                      defaultValue={field.contactType}
                    />
                    <div className={styles.phoneGroup}>
                      <select
                        {...register(`contacts.${index}.phoneNumberType`)}
                        defaultValue={field.phoneNumberType || ""}
                      >
                        <option value="">Phone Type</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Work">Work</option>
                        <option value="Home">Home</option>
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
            ) : (
              <div className={styles.contactsList}>
                {storeDetails.contacts?.map((c, i) => (
                  <div key={i} className={styles.contactEntry}>
                    <p>
                      {i + 1}. {c.suffix} {c.firstName} {c.middleName}{" "}
                      {c.lastName}
                    </p>
                    <p>Contact Type: {c.contactType}</p>
                    <p>
                      Phone: {c.phoneNumber} ({c.phoneNumberType})
                    </p>
                    <p>Email: {c.emailAddress}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Previous Sales Section */}
          <section className={styles.previousSales}>
            <h3>Previous Sales</h3>
            {storeDetails.previousOrders?.length > 0 ? (
              <div className={styles.previousSalesTable}>
                {/* Table Headers */}
                <div className={styles.previousSalesHeader}>
                  <span className={styles.orderDateHeader}>Order Date</span>
                  <span className={styles.totalPaidHeader}>Total Paid</span>
                </div>
                {/* Table Rows */}
                {storeDetails.previousOrders.map((order, index) => (
                  <div key={index} className={styles.previousSalesRow}>
                    <span className={styles.orderDate}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                    <span className={styles.totalPaid}>
                      {order.totalDue?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No previous sales available.</p>
            )}
          </section>
        </div>
        </>
        )}
      </div>
      </div>
  );
}