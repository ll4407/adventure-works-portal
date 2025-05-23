import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useForm, useFieldArray } from "react-hook-form";
import StoreHeader from "./StoreOrder/StoreHeader";
import SaleDetails from "./StoreOrder/SaleDetails";
import StoreInfo from "./StoreOrder/StoreInfo";
import Contacts from "./StoreOrder/Contacts";
import ContactsForm from "./StoreOrder/ContactsForm";
import PreviousSales from "./StoreOrder/PreviousSales";
import styles from "./Store.module.css";
import { toast } from "react-toastify";
import { Close } from "../../icons";

export default function Store({ selectedSaleId, onClose, onUpdate }) {
  const [storeDetails, setStoreDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phoneNumberTypes, setPhoneNumberTypes] = useState([]);
  const [contactTypes, setContactTypes] = useState([]);

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

    axios
      .get(`/order/store/${selectedSaleId}`)
      .then(({ data }) => {
        setStoreDetails(data);
        reset({ contacts: data.contacts || [] });
      })
      .catch((err) => {
        toast.error("Failed to load store details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSaleId, reset]);

  // Fetch phone number types
  useEffect(() => {
    axios
      .get("/PhoneNumberType")
      .then((resp) => setPhoneNumberTypes(resp.data))
      .catch(() => setPhoneNumberTypes([]));
  }, []);

  // Fetch contact types
  useEffect(() => {
  axios
    .get("/ContactType")
    .then((resp) => setContactTypes(resp.data))
    .catch(() => setContactTypes([]));
}, []);

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

      const updatedStore = {
        ...storeDetails,
        contacts: values.contacts,
      };

      setStoreDetails(updatedStore);
      setIsEditing(false);

      // Notify parent to update the store in the sales list
      if (onUpdate) {
        onUpdate(updatedStore);
      }
    } catch (err) {
      toast.error("Failed to update contacts. Please try again.");
    }
  };

  if (!selectedSaleId) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close Modal. Go back to list" className={styles.modalClose} onClick={onClose}>
          <Close className={styles.close} />
        </button>

        {storeDetails && (
          <>
            <StoreHeader storeDetails={storeDetails} />

            <div className={styles.detailsGrid}>
              <SaleDetails details={storeDetails} />
              <StoreInfo details={storeDetails} />
              {isEditing ? (
                <ContactsForm
                  fields={fields}
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  reset={reset}
                  setIsEditing={setIsEditing}
                  storeDetails={storeDetails}
                  phoneNumberTypes={phoneNumberTypes} 
                  contactTypes={contactTypes}
                />
              ) : (
                <Contacts
                  contacts={storeDetails.contacts}
                  isEditing={isEditing}
                  onEdit={handleEditClick}
                />
              )}

              <PreviousSales previousOrders={storeDetails.previousOrders} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
