import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

export const Change_Address = createAsyncThunk(
  "address/ChangeAddress",
  async (addressData, { rejectWithValue }) => {
    const filteredAddressData = Object.fromEntries(
      Object.entries(addressData).filter(([_, value]) => value !== "")
    );
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.updateAddress}`,
        filteredAddressData,
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

export const Get_Address = createAsyncThunk(
  "address/GetAddress",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.get(`${Config.baseUrl}/${Api.getProfile}`, {
        headers: {
          ...Config.appHeaders,
          Authorization: `Bearer ${token}`,
        },
      });
      const billingAddress = response.data.billingAddress;
      const filteredData = {
        firstName: billingAddress.firstName || "",
        lastName: billingAddress.lastName || "",
        phone: billingAddress.phone || "",
        addressLine1: billingAddress.addressLine1 || "",
        addressLine2: billingAddress.addressLine2 || "",
        city: billingAddress.city || "",
        state: billingAddress.state || "",
        stateCode: billingAddress.stateCode || "",
        country: billingAddress.country || "",
        countryCode: billingAddress.countryCode || "",
        pincode: billingAddress.pincode || "",
      };
      return filteredData;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  data: {
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    stateCode: "",
    country: "",
    countryCode: "",
    pincode: "",
  },
  fetchLoading: false,
  fetchError: null,
  updateLoading: false,
  updateError: null,
};

const changeAddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    Set_Address_Field(state, action) {
      const { field, value } = action.payload;
      state.data[field] = value;
      if (field === "country") {
        state.data.state = "";
        state.data.city = "";
        state.data.countryCode = "";
        state.data.stateCode = "";
      } else if (field === "state") {
        state.data.city = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Change_Address.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(Change_Address.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload;
      })
      .addCase(Change_Address.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      .addCase(Get_Address.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(Get_Address.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(Get_Address.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });
  },
});

export const { Set_Address_Field } = changeAddressSlice.actions;

export default changeAddressSlice.reducer;
