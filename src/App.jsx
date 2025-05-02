import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employee from './container/Employee/EmployeeSetup';
import Product from './container/Product/ProductSetup';
import Purchasing from './container/Purchasing/PurchasingSetup';
import Sale from './container/Sale/SaleSetup';import Login from './components/Login/Login';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Layout><h1>Dashboard</h1></Layout>} />
      <Route path='/employees' element={<Layout><Employee /></Layout>} />
      <Route path='/products' element={<Layout><Product /></Layout>} />
      <Route path='/purchasing' element={<Layout><Purchasing /></Layout>} />
      <Route path='/sales' element={<Layout><Sale /></Layout>} />
      <Route path='/settings' element={<Layout><h1>Settings</h1></Layout>} />
    </Routes>
  )
}

export default App