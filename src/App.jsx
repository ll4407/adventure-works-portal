import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employees from './container/Employee/Employees';
import Products from './container/Products/Products';
import Purchasing from './container/Purchasing/Purchasing';
import Sales from './container/Sale/Sales';import Login from './components/Login/Login';
import InventoryModal from './components/Products/InventoryModal';
import CatalogModal from './components/Products/Catalog/CatalogModal';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/products/:activePage?' element={<Products />}>
          <Route path='/products/inventory/:productId/:locationId' element={<InventoryModal />} />
          <Route path='/products/catalog/:id' element={<CatalogModal />} />
        </Route>
        <Route path='/purchasing' element={<Purchasing />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  )
}

export default App