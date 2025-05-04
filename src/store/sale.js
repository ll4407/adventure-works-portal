import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk to fetch orders based on the active tab
export const fetchOrders = createAsyncThunk(
  'sales/fetchOrders',
  async (activeTab, { rejectWithValue }) => {
    try {
      const endpoint = activeTab === 'customers' ? '/Order/customer' : '/Order/store';
      const { data }  = await axios.get(endpoint);
      return data.map(item => {
        if (activeTab === 'customers') {
          return {
            id: item.id,
            customer: `${item.firstName} ${item.lastName}`,
            orderDate: item.orderDate,
            orderNumber: item.orderNumber,
            orderQty: item.orderQty,
            shipDate: item.shipDate,
            unitPrice: item.unitPrice,
            totalDue: item.lineTotal,
          };
        } else {
          return {
            id: item.id,
            store: item.storeName,
            orderDate: item.orderDate,
            contact: `${item.contactFirstName} ${item.contactLastName}`,
            orderNumber: item.orderNumber,
            product: item.productName,
            unitPrice: item.unitPrice,
            totalDue: item.lineTotal,
          };
        }
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    activeTab: 'customers',       
    selectedOrderId: null,
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    showCustomers(state) {
      state.activeTab = 'customers';
      state.selectedOrderId = null;
    },
    showStores(state) {
      state.activeTab = 'stores';
      state.selectedOrderId = null;
    },
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
export const {
  showCustomers,
  showStores,
  setSelectedOrderId,
} = salesSlice.actions;