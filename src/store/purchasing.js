import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";

export const loadValuesAsync = createAsyncThunk('purchasing/loadValuesAsync', async (arg, { dispatch, getState }) => {
    const state = getState();

    if(!state.purchase.listItems.length){
        try{
            const resp = await axios.get('/Vendor');
            return resp.data;
        }
        catch(err){
            toast.error(err.toString());
        }
    }
});


const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        listItems: [],
    },
    reducers: {
        storeElement: (state, action) => {
            state.listItems = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadValuesAsync.fulfilled, (state, action) => {
            if(action.payload){
                state.listItems = action.payload;
            }
        });
    }
});


export default purchaseSlice.reducer;
export const { storeElement } = purchaseSlice.actions;