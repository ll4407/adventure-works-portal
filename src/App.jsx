import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>Login</h1>} />
      <Route path='/dashboard' element={<Layout><h1>Dashboard</h1></Layout>} />
      <Route path='/employees' element={<Layout><h1>Employees</h1></Layout>} />
      <Route path='/products' element={<Layout><h1>Products</h1></Layout>} />
      <Route path='/purchasing' element={<Layout><h1>Purchasing</h1></Layout>} />
      <Route path='/sales' element={<Layout><h1>Sales</h1></Layout>} />
      <Route path='/settings' element={<Layout><h1>Settings</h1></Layout>} />
    </Routes>
  )
}

export default App