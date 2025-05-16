import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Employees from './container/Employee/Employees';
import Login from './components/Login/Login';
import Products from './container/Products/Products';
import ProtectedRoute from './components/Login/ProtectedRoute';
import Purchasing from './container/Purchasing/Purchasing';
import Sales from './container/Sale/Sales';

import { Catalog, CatalogModal, Inventory, InventoryModal } from './components/Products';

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
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />}>
          <Route path="/products/inventory/" element={<Inventory/>}>
            <Route path='/products/inventory/:productId/:locationId' element={<InventoryModal />} />
          </Route>
          <Route path="/products/catalog/" element={<Catalog />}>
            <Route path='/products/catalog/:id' element={<CatalogModal />} />
          </Route>
        </Route>
        <Route path="/purchasing" element={<Purchasing />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
}

export default App;