import { Routes, Route } from 'react-router-dom';
import Dashboard from './container/Dashboard/Dashboard';
import { Employees, Products, Purchasing, Sales } from './container';
import { Layout, Login, ProtectedRoute, Inventory, InventoryModal, Catalog, CatalogModal } from './components';
import Vendors from './components/Purchasing/Vendors';
import VendorDetails from './container/Purchasing/VendorsDetails';
import Orders from './components/Purchasing/Orders';
import OrderDetail from './container/Purchasing/OrderDetail';


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
          <Route path="/employees/:id" element={<>Employee Modal</>} />
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
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
}

export default App;