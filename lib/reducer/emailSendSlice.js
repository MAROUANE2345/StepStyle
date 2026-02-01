import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= ASYNC THUNK =================

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (
    { name, email, city, phone, address, totalPrice, orderInfo },
    thunkAPI
  ) => {
    try {
      await axios.post(
        "http://localhost:5678/webhook-test/cca321a2-6d6f-44ad-9336-a3f6713ba70c",
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// ================= INITIAL STATE =================

const initialState = {
  loading: false,
  success: false,
  error: null,
};

// ================= SLICE =================

const emailSendSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetEmailState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // PENDING
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // FULFILLED
      .addCase(sendEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // REJECTED
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmailState } = emailSendSlice.actions;

export default emailSendSlice.reducer;
