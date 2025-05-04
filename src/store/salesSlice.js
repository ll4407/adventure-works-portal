import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk to fetch orders based on the active tab
export const fetchOrders = createAsyncThunk(
  'sales/fetchOrders',
  async (activeTab, { rejectWithValue }) => {
    try {
      const endpoint = activeTab === 'customers' ? '/Order/customer' : '/Order/store';
      const response = await axios.get(endpoint);
      return response.data.map(item => {
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
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
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