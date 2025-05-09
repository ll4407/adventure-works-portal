import React, { useEffect, useState, useCallback } from "react";
import axios from "../../api/axios";
import { useForm, useFieldArray } from "react-hook-form";
import Edit from "../../icons/Edit";
import styles from "./StoreModal.module.css";
import { toast } from "react-toastify";

export default function StoreModal({ selectedSaleId, onClose }) {
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: { contacts: [] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts"
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
          axios.put(`/Contact/${c.businessEntityId}/${storeDetails.storeEntityId}`, {
            businessEntityId: c.businessEntityId,
            personId: c.personId,
            personalTitle: c.title || "",
            firstName: c.firstName,
            middleName: c.middleName,
            lastName: c.lastName,
            suffix: c.suffix,
            contactTypeId: c.contactTypeId,
          })
        )
      );
  
      toast.success("Contacts updated successfully");
      setStoreDetails((prev) => ({
        ...prev,
        contacts: values.contacts,
      }));
      onClose(values.contacts[0]); // Pass the updated contact
      setIsEditing(false);
    } catch (err) {
      console.error("Contacts update error:", err.response || err);
      toast.error("Failed to update contacts. Please try again.");
    }
  };
  
  if (!selectedSaleId) return null;
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <button className={styles.modalClose} onClick={() => onClose()}>
  ×
</button>
        <h2>Store Details</h2>

        {/* Order & Sale Details */}
        <p><strong>Order Date:</strong> {new Date(storeDetails.orderDate).toLocaleDateString()}</p>
        <p><strong>Sales Order #:</strong> {storeDetails.orderNumber}</p>

        <div className={styles.detailsGrid}>
          <div>
            <h3>Sale Details</h3>
            <p><strong>Order Number:</strong> {storeDetails.orderNumber}</p>
            <p><strong>Tracking #:</strong> {storeDetails.carrierTrackingNumber || 'N/A'}</p>
            <p><strong>Qty:</strong> {storeDetails.orderQty}</p>
            <p><strong>Product:</strong> {storeDetails.productName}</p>
            <p><strong>Product ID:</strong> {storeDetails.productId}</p>
            <p><strong>Unit Price:</strong> {storeDetails.unitPrice?.toLocaleString('en-US',{style:'currency',currency:'USD'})}</p>
            <p><strong>Discount:</strong> {storeDetails.unitPriceDiscount?.toLocaleString('en-US',{style:'currency',currency:'USD'})}</p>
            <p><strong>Line Total:</strong> {storeDetails.lineTotal?.toLocaleString('en-US',{style:'currency',currency:'USD'})}</p>
          </div>
          <div>
            <h3>Store Info</h3>
            <p><strong>Store Name:</strong> {storeDetails.storeName}</p>
            <p><strong>Annual Sales:</strong> {storeDetails.annualSales?.toLocaleString('en-US',{style:'currency',currency:'USD'})}</p>
            <p><strong>Bank:</strong> {storeDetails.bankName}</p>
            <p><strong>Square Feet:</strong> {storeDetails.squareFeet}</p>
            <p><strong>Specialty:</strong> {storeDetails.specialty}</p>
            <p><strong>Employees:</strong> {storeDetails.numberEmployees}</p>
          </div>
          <div>
            <h3>Previous Sales</h3>
            {storeDetails.previousOrders?.map((order,i)=>(
              <div key={i}>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Total Paid:</strong> {order.totalDue?.toLocaleString('en-US',{style:'currency',currency:'USD'})}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div className={styles.contactsHeader}>
          <h3>Contacts</h3>
          {!isEditing && (
            <button type="button" className={styles.editButton} onClick={handleEditClick}>
              <Edit className={styles.editIcon} />
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.contactsForm}>
            {fields.map((field,index)=>(
              <div key={field.id} className={styles.contactRow}>
                <input
                  {...register(`contacts.${index}.firstName`)}
                  placeholder="First Name"
                />
                <input
                  {...register(`contacts.${index}.middleName`)}
                  placeholder="Middle Name"
                />
                <input
                  {...register(`contacts.${index}.lastName`)}
                  placeholder="Last Name"
                />
                <input
                  {...register(`contacts.${index}.suffix`)}
                  placeholder="Suffix"
                />
              </div>
            ))}
            <div className={styles.formActions}>
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => {
                  reset({ contacts: storeDetails.contacts });
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.contactsList}>
            {storeDetails.contacts?.map((c,i)=>(
              <div key={i} className={styles.contactEntry}>
                <p><strong>{i+1}. {c.firstName} {c.lastName}</strong></p>
                <p>Type: {c.contactType}</p>
                <p>Phone: {c.phoneNumber} ({c.phoneNumberType})</p>
                <p>Email: {c.emailAddress}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import styles from "./StoreModal.module.css";

// export default function StoreModal({ selectedSaleId, onClose }) {
//   const [storeDetails, setStoreDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch store details when the modal is opened
//   useEffect(() => {
//     if (!selectedSaleId) return;

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`/order/store/${selectedSaleId}`)
//       .then((response) => {
//         setStoreDetails(response.data);
//       })
//       .catch((err) => {
//         setError("Failed to load store details.");
//         console.error(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [selectedSaleId]);

//   if (!selectedSaleId) return null;

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button className={styles.modalClose} onClick={onClose}>
//           ×
//         </button>
//         <h2>{storeDetails?.storeName || "Store/Business Name"}</h2>
//         <p>
//           <strong>Order Date:</strong> {new Date(storeDetails?.orderDate).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Sales Order Number:</strong> {storeDetails?.orderNumber}
//         </p>

//         {loading && <p>Loading...</p>}
//         {error && <p className={styles.error}>{error}</p>}

//         {storeDetails && (
//           <div className={styles.detailsGrid}>
//             {/* Sale Details */}
//             <div>
//               <h3>Sale Details</h3>
//               <p>
//                 <strong>Order Number:</strong> {storeDetails.orderNumber}
//               </p>
//               <p>
//                 <strong>Tracking Number:</strong> {storeDetails.carrierTrackingNumber || "N/A"}
//               </p>
//               <p>
//                 <strong>Order Quantity:</strong> {storeDetails.orderQty}
//               </p>
//               <p>
//                 <strong>Product Name:</strong> {storeDetails.productName}
//               </p>
//               <p>
//                 <strong>Product ID:</strong> {storeDetails.productId}
//               </p>
//               <p>
//                 <strong>Unit Price:</strong>{" "}
//                 {storeDetails.unitPrice?.toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 })}
//               </p>
//               <p>
//                 <strong>Unit Price Discount:</strong>{" "}
//                 {storeDetails.unitPriceDiscount?.toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 })}
//               </p>
//               <p>
//                 <strong>Line Total:</strong>{" "}
//                 {storeDetails.lineTotal?.toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 })}
//               </p>
//             </div>

//             {/* Store Information */}
//             <div>
//               <h3>Store Information</h3>
//               <p>
//                 <strong>Annual Sales:</strong>{" "}
//                 {storeDetails.annualSales?.toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 })}
//               </p>
//               <p>
//                 <strong>Bank:</strong> {storeDetails.bankName}
//               </p>
//               <p>
//                 <strong>Square Footage:</strong> {storeDetails.squareFeet}
//               </p>
//               <p>
//                 <strong>Specialty:</strong> {storeDetails.specialty}
//               </p>
//               <p>
//                 <strong>Total Employees:</strong> {storeDetails.numberEmployees}
//               </p>
//             </div>

//             {/* Previous Sales */}
//             <div>
//               <h3>Previous Sales</h3>
//               {storeDetails.previousOrders.map((order, index) => (
//                 <div key={index}>
//                   <p>
//                     <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Total Paid:</strong>{" "}
//                     {order.totalDue?.toLocaleString("en-US", {
//                       style: "currency",
//                       currency: "USD",
//                     })}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Contacts */}
//             <div>
//               <h3>Contacts</h3>
//               {storeDetails.contacts.map((contact, index) => (
//                 <div key={index}>
//                   <p>
//                     <strong>{index + 1}. {contact.firstName} {contact.lastName}</strong>
//                   </p>
//                   <p>
//                     <strong>Contact Type:</strong> {contact.contactType}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {`${contact.phoneNumber} (${contact.phoneNumberType})`}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {contact.emailAddress}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }