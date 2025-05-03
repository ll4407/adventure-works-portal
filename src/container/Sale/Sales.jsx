import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setActiveTab, setSelectedOrderId } from "../../store/salesSlice";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Table from "../../components/Table/Table";

export default function Sales() {
  const dispatch = useDispatch();

  // Access state from Redux store
  const { activeTab, orders, selectedOrderId, status, error } = useSelector((state) => state.sales);

  // Fetch orders when the active tab changes
  useEffect(() => {
    dispatch(fetchOrders(activeTab)); // Fetch data based on the active tab
  }, [activeTab, dispatch]);

  // Handle tab change
  const handleTabChange = (idx) => {
    const newTab = idx === 0 ? "customers" : "stores";
    dispatch(setActiveTab(newTab)); // Update activeTab in Redux
  };

  // Handle row click
  const handleRowClick = (row) => {
    dispatch(setSelectedOrderId(row.id)); // Update selected order ID in Redux
    console.log("Selected order ID:", row.id);
  };

  // Define columns based on the active tab
  const customerColumns = [
    { key: "customer", label: "Customer" },
    { key: "orderDate", label: "Order Date" },
    { key: "orderNumber", label: "Order #" },
    { key: "orderQty", label: "Order Qty" },
    { key: "shipDate", label: "Ship Date" },
    { key: "unitPrice", label: "Unit Price" },
    { key: "totalDue", label: "Total Due" },
  ];

  const storeColumns = [
    { key: "store", label: "Store / Business" },
    { key: "orderDate", label: "Order Date" },
    { key: "contact", label: "Contact" },
    { key: "orderNumber", label: "Order #" },
    { key: "product", label: "Product" },
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