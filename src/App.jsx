import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employees from './container/Employee/Employees';
import Products from './container/Product/Products';
import Purchasing from './container/Purchasing/Purchasing';
import Sale from './container/Sale/Sale';
import Login from './components/Login/Login';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/products' element={<Products />} />
        <Route path='/purchasing' element={<Purchasing />} />
        <Route path='/sales' element={<Sale />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  )
}

export default App