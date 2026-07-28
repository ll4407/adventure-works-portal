import { Routes, Route } from 'react-router-dom';
import Dashboard from './container/Dashboard/Dashboard';
import { Employees, Products, Purchasing, Sales } from './container';
import { Layout, Login, ProtectedRoute, Inventory, InventoryModal, Catalog, CatalogModal, EmployeeModal } from './components';
import Vendors from './components/Purchasing/Vendors';
import VendorDetails from './container/Purchasing/VendorsDetails';
import Orders from './components/Purchasing/Orders';
import OrderDetail from './container/Purchasing/OrderDetail';
import Customers from './container/Sale/Customers';
import Stores from './container/Sale/Stores';
import StoreModal from './container/Sale/StoreModal';
import CustomerModal from './container/Sale/CustomerModal';


import Settings from './container/Settings/Settings';


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employees" element={<Employees />}>
          <Route path="/employees/:employeeId" element={<EmployeeModal />} />
        </Route>
        <Route path="/products" element={<Products />}>
          <Route path="/products/inventory/" element={<Inventory/>}>
            <Route path='/products/inventory/:productId/:locationId' element={<InventoryModal />} />
          </Route>
          <Route path="/products/catalog/" element={<Catalog />}>
            <Route path='/products/catalog/:id' element={<CatalogModal />} />
          </Route>
        </Route>
        <Route path="/purchasing" element={<Purchasing />} >
          <Route path="/purchasing/vendors" element={<Vendors />}>
            <Route path="/purchasing/vendors/:id/:phone" element={<VendorDetails />} />
          </Route>
          <Route path="/purchasing/orders" element={<Orders />}>
            <Route path="/purchasing/orders/:id" element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="/sales" element={<Sales />}>
          <Route path="/sales/customers" element={<Customers />}>
            <Route path="/sales/customers/:id" element={<CustomerModal />} />
          </Route>
          <Route path="/sales/stores" element={<Stores />}>
            <Route path="/sales/stores/:id" element={<StoreModal />} />
          </Route>
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;