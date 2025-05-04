import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/salesSlice";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Table from "../../components/Table/Table";

export default function Sales() {
  const dispatch = useDispatch();

  // Local state for activeTab and selectedOrderId
  const [activeTab, setActiveTab] = useState("customers");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Access orders, status, and error from Redux
  const { orders, status, error } = useSelector((state) => state.sales);

  // Fetch orders when the active tab changes
  useEffect(() => {
    dispatch(fetchOrders(activeTab)); // Fetch data based on the active tab
  }, [activeTab, dispatch]);

  // Handle tab change
  const handleTabChange = (idx) => {
    const newTab = idx === 0 ? "customers" : "stores";
    setActiveTab(newTab); // Update local state
    setSelectedOrderId(null); // Clear selection on tab switch
  };

  // Handle row click
  const handleRowClick = (row) => {
    setSelectedOrderId(row.id); // Update local state
    console.log("Selected order ID:", row.id);
  };

  // Define columns based on the active tab
  const customerColumns = [
    { key: "customer", label: "Customer" },
    { key: "orderDate", label: "Order Date" },
    { key: "orderNumber", label: "Order Number" },
    { key: "orderQty", label: "Order Qty" },
    { key: "shipDate", label: "Ship Date" },
    { key: "unitPrice", label: "Unit Price" },
    { key: "totalDue", label: "Total Due" },
  ];

  const storeColumns = [
    { key: "store", label: "Store / Business" },
    { key: "orderDate", label: "Order Date" },
    { key: "contact", label: "Contact Name" },
    { key: "orderNumber", label: "Order Number" },
    { key: "product", label: "Product Name" },
    { key: "unitPrice", label: "Unit Price" },
    { key: "totalDue", label: "Total Due" },
  ];

  return (
    <>
      <SectionHeader
        title="Sales"
        color="Pink"
        firstButton="Customers"
        secondButton="Stores"
        onChange={handleTabChange} // Pass tab change handler
        onSearch={(term) => console.log("Search term:", term)} // ToDo: Handle search
      />

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <Table
        rows={orders} // Use orders from Redux
        columns={activeTab === "customers" ? customerColumns : storeColumns}
        onRowClick={handleRowClick} // Pass row click handler
      />

      {selectedOrderId && <div>Selected Order ID: {selectedOrderId}</div>}
    </>
  );
}