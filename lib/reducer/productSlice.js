import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= ASYNC THUNKS =================

// 🔥 FETCH PRODUCTS (GET)

// 🔥 ADD PRODUCT (POST)
export const addProduct = createAsyncThunk(
    "data/addProduct",
    async (product, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes",
                product,
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const fetchProducts = createAsyncThunk(
    "data/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes");
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteProducts = createAsyncThunk(
    "data/deleteProducts",
    async (id, thunkAPI) => {
        try {
            await axios.delete(
                `https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes/${id}`
            );

            // return the id so we can remove it from redux state
            return id;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const editProduct = createAsyncThunk(
    "data/editProduct",
    async (updatedProduct, thunkAPI) => {
        try {
            await axios.put(
                `https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes/${updatedProduct.id}`,
                updatedProduct
            );
            return updatedProduct;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)




// ================= INITIAL STATE =================

const initialState = {
    products: [],
   
    selectedProduct: null,
    loading: false,
    error: null,
};

// ================= SLICE =================

const productSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);

                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(editProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.products = state.products.map(function (product) {
                    if (product.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return product;
                    }
                });

                state.loading = false;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }

});

export default productSlice.reducer;
