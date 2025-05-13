import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Employees from './container/Employee/Employees';
import Products from './container/Products/Products';
import Purchasing from './container/Purchasing/Purchasing';
<<<<<<< HEAD
import VendorsDetails from './container/Purchasing/VendorsDetails';
import OrderDetails from './container/Purchasing/OrderDetail';
import Sales from './container/Sale/Sales';import Login from './components/Login/Login';
=======
import Sales from './container/Sale/Sales';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Login/ProtectedRoute';
>>>>>>> main

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path='/' element={<Login/>} />
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/products' element={<Products />} />
        <Route path='/purchasing' element={<Purchasing />}>
            <Route path='/purchasing/vendor/:id/:phone' element={<VendorsDetails />} />
            <Route path='/purchasing/order/:id' element={<OrderDetails />} />
        </Route>
        <Route path='/sales' element={<Sales />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
=======
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
        <Route path="/products" element={<Products />} />
        <Route path="/purchasing" element={<Purchasing />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
>>>>>>> main
      </Route>
    </Routes>
  );
}

export default App;