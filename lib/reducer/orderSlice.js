import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= ASYNC THUNK =================

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://69733ee0b5f46f8b58269eb8.mockapi.io/order");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (
        { name, email, city, phone, address, totalPrice, orderInfo },
        thunkAPI
    ) => {
        try {
            await axios.post(
                "https://69733ee0b5f46f8b58269eb8.mockapi.io/order",
                {
                    name,
                    email,
                    city,
                    phone,
                    address,
                    totalPrice,
                    orderInfo,
                }
            );
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);






// ================= INITIAL STATE =================

const initialState = {
    orders: [],
    error: null,
};

// ================= SLICE =================

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {

                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;

            })
            .addCase(fetchOrders.rejected, (state, action) => {

                state.error = action.payload;
            })

    },
});



export default orderSlice.reducer;
