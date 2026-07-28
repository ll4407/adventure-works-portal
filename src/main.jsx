import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
Amplify.configure(outputs);

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.getElementById('root').classList.add('dark-theme');
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import accountReducer from './store/account';  
import { ToastContainer } from 'react-toastify'

const store = configureStore({
  reducer: {
    account: accountReducer,
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