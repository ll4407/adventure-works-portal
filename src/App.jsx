import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employee from './container/Employee/EmployeeSetup';
import Product from './container/Product/ProductSetup';
import Purchasing from './container/Purchasing/PurchasingSetup';
import Sale from './container/Sale/SaleSetup';
function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>Login</h1>} />
<<<<<<< HEAD
      <Route path='/employees' element={<Layout><Employee /></Layout>} />
      <Route path='/products' element={<Layout><Product /></Layout>} />
      <Route path='/purchasing' element={<Layout><Purchasing /></Layout>} />
      <Route path='/sales' element={<Layout><Sale /></Layout>} />
=======
      <Route path='/dashboard' element={<Layout><h1>Dashboard</h1></Layout>} />
      <Route path='/employees' element={<Layout><h1>Employees</h1></Layout>} />
      <Route path='/products' element={<Layout><h1>Products</h1></Layout>} />
      <Route path='/purchasing' element={<Layout><h1>Purchasing</h1></Layout>} />
      <Route path='/sales' element={<Layout><h1>Sales</h1></Layout>} />
      <Route path='/settings' element={<Layout><h1>Settings</h1></Layout>} />
>>>>>>> 5248827ba55de5aa6494e6456ac08becebc65807
    </Routes>
  )
}

export default App