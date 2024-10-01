import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../config";
import { Api } from "../../apiList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const calculateExpressCheckoutThread = createAsyncThunk(
  "calculateExpressCheckoutThread",
  async (data, { rejectWithValue }) => {
    try {
      let token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.calculate_express_checkout}`,
        data,
        {
          headers: {
            ...Config.appHeaders,
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  expressCheckoutData: [],
  expressCheckoutLoading: false,
  expressCheckoutStatus: false,
  expressCheckoutError: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      calculateExpressCheckoutThread.fulfilled,
      (state, { payload }) => {
        (state.expressCheckoutData = payload),
          (state.expressCheckoutLoading = false),
          (state.expressCheckoutStatus = true),
          (state.expressCheckoutError = false);
      }
    ),
      builder.addCase(calculateExpressCheckoutThread.pending, (state) => {
        (state.expressCheckoutLoading = true),
          (state.expressCheckoutStatus = false),
          (state.expressCheckoutError = false);
      }),
      builder.addCase(
        calculateExpressCheckoutThread.rejected,
        (state, { payload }) => {
          (state.expressCheckoutError = payload),
            (state.expressCheckoutLoading = false),
            (state.expressCheckoutStatus = false);
        }
      );
  },
});

export const cart = {
  calculateExpressCheckoutThread,
  ...cartSlice.actions,
};
export default cartSlice.reducer;
