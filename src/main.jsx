import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import accountReducer from './store/account';  
import { ToastContainer } from 'react-toastify'
// import salesReducer from './store/sale.js';

const store = configureStore({
  reducer: {
    account: accountReducer,
    // sales: salesReducer, 
  },
  devTools: true,
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  </StrictMode>,
)