import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";

//async functions
export const loadVendorsValuesAsync = createAsyncThunk('purchasing/loadVendorsValuesAsync', async (arg, { dispatch, getState }) => {
    const state = getState();

    if(!state.purchase.vendorsList.length){
        try{
            const resp = await axios.get(`/Vendor`);
            return resp.data;
        }
        catch(err){
            toast.error(err.toString());
        }
    }
});
export const loadOrdersValuesAsync = createAsyncThunk('purchasing/loadOrdersValuesAsync', async (arg, { dispatch, getState }) => {
    const state = getState();

    if(!state.purchase.ordersList.length){
        try{
            const resp = await axios.get(`/Order/store`);
            return resp.data;
        }
        catch(err){
            toast.error(err.toString());
        }
    }
});



//The slice
const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        vendorsList: [],
        ordersList: [],
        selectedTab: ''
    },
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(loadVendorsValuesAsync.fulfilled, (state, action) => {
            if(action.payload){
                state.vendorsList = action.payload;
            }
        })
        .addCase(loadOrdersValuesAsync.fulfilled, (state, action) => {
            if(action.payload){
                state.ordersList = action.payload;
            }
        });
    }
});


export default purchaseSlice.reducer;
export const { } = purchaseSlice.actions;