import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employees from './container/Employee/Employees';
import Products from './container/Product/Products';
import Purchasing from './container/Purchasing/Purchasing';
import Sales from './container/Sale/Sales';import Login from './components/Login/Login';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Layout><h1>Dashboard</h1></Layout>} />
      <Route path='/employees' element={<Employees />} />
      <Route path='/products' element={<Products />} />
      <Route path='/purchasing' element={<Purchasing />} />
      <Route path='/sales' element={<Sales />} />
      <Route path='/settings' element={<Layout><h1>Settings</h1></Layout>} />
    </Routes>
  )
}

export default App