import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, showCustomers, showStores } from "../../store/sale";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Table from "../../components/Table/Table";

export default function Sales() {
  const dispatch = useDispatch();

  // Access orders, status, and error from Redux
  const { activeTab, orders, status, error, selectedOrderId } = useSelector((state) => state.sales);

  // Fetch orders when the active tab changes
  useEffect(() => {
    dispatch(fetchOrders(activeTab)); // Fetch data based on the active tab
  }, [activeTab, dispatch]);


  // Handle row click
  const handleRowClick = row => {
    dispatch(setSelectedOrderId(row.id));
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
        onTabChange={(idx) => idx === 0? 
            dispatch(showCustomers()) : dispatch(showStores())} 
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