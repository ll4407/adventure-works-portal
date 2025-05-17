import { Routes, Route } from 'react-router-dom';

import { Employees, Products, Purchasing, Sales } from './container';
import { Layout, Login, ProtectedRoute, Inventory, InventoryModal, Catalog, CatalogModal } from './components';

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
        <Route path="/purchasing" element={<Purchasing />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
}

export default App;