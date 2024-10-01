import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

export const Apply_Coupon = createAsyncThunk(
  "coupon/ApplyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.post(
        `${Config.baseUrl}/${Api.coupon_apply(couponCode)}`,
        {
          type: "regular",
        },
        {
          headers: {
            ...Config.appHeaders,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const Remove_Coupon = createAsyncThunk(
  "coupon/RemoveCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.coupon_remove}`,
        {},
        {
          headers: {
            ...Config.appHeaders,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  couponData: null,
  applyLoading: false,
  applyError: null,
  removeLoading: false,
  removeError: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Apply_Coupon.pending, (state) => {
        state.applyLoading = true;
        state.applyError = null;
      })
      .addCase(Apply_Coupon.fulfilled, (state, action) => {
        state.applyLoading = false;
        state.couponData = action.payload;
      })
      .addCase(Apply_Coupon.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyError = action.payload;
      })
      .addCase(Remove_Coupon.pending, (state) => {
        state.removeLoading = true;
        state.removeError = null;
      })
      .addCase(Remove_Coupon.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.couponData = null;
      })
      .addCase(Remove_Coupon.rejected, (state, action) => {
        state.removeLoading = false;
        state.removeError = action.payload;
      });
  },
});

export default couponSlice.reducer;
