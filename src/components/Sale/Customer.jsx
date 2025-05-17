import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CustomerHeader from "./CustomerOrder/CustomerHeader";
import CustomerInformation from "./CustomerOrder/CustomerInformation";
import SaleDetails from "./CustomerOrder/SaleDetails";
import PricingDetails from "./CustomerOrder/PricingDetails";
import ShippingInformation from "./CustomerOrder/ShippingInformation";
import styles from "./Customer.module.css";
import { toast } from "react-toastify";
import { Close } from "../../icons";

export default function Customer({ selectedSaleId, onClose }) {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch customer details when the modal is opened
  useEffect(() => {
    if (!selectedSaleId) return;

    setLoading(true);
    axios
      .get(`/Order/customer/${selectedSaleId}`)
      .then((response) => {
        setCustomerDetails(response.data);
      })
      .catch((err) => {
        toast.error("Failed to load customer details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSaleId]);

  if (!selectedSaleId) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <Close className={styles.close} />
        </button>

        {customerDetails ? (
          <>
            <CustomerHeader customerDetails={customerDetails} />

            <div className={styles.detailsGrid}>
              <CustomerInformation details={customerDetails} />
              <SaleDetails details={customerDetails} />
              <PricingDetails details={customerDetails} />
              <ShippingInformation details={customerDetails} />
            </div>
          </>
        ) : (
          <p>No customer details available.</p>
        )}
      </div>
    </div>
  );
}
