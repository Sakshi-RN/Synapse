import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

export const Verify_Primary_Email_OTP = createAsyncThunk(
  "email/VerifyPrimaryEmailOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.verify_otp_primary_email}`,
        otpData,
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

export const Verify_Secondary_Email_OTP = createAsyncThunk(
  "email/VerifySecondaryEmailOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.verify_otp_recovery_email}`,
        otpData,
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

export const Resend_OTP_Email_Verification = createAsyncThunk(
  "otp/ResendOtpEmailVerification",
  async (data, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.resend_otp_for_register}`,
        data,
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

const initialState = {
  primaryEmailOTPLoading: false,
  primaryEmailOTPError: null,
  secondaryEmailOTPLoading: false,
  secondaryEmailOTPError: null,
  resendOTPLoading: false,
  resendOTPError: null,
};

const verifyOTPSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Verify_Primary_Email_OTP.pending, (state) => {
        state.primaryEmailOTPLoading = true;
        state.primaryEmailOTPError = null;
      })
      .addCase(Verify_Primary_Email_OTP.fulfilled, (state, action) => {
        state.primaryEmailOTPLoading = false;
        state.primaryEmailOTP = action.payload;
      })
      .addCase(Verify_Primary_Email_OTP.rejected, (state, action) => {
        state.primaryEmailOTPLoading = false;
        state.primaryEmailOTPError = action.payload;
      })
      .addCase(Verify_Secondary_Email_OTP.pending, (state) => {
        state.secondaryEmailOTPLoading = true;
        state.secondaryEmailOTPError = null;
      })
      .addCase(Verify_Secondary_Email_OTP.fulfilled, (state, action) => {
        state.secondaryEmailOTPLoading = false;
        state.secondaryEmailOTP = action.payload;
      })
      .addCase(Verify_Secondary_Email_OTP.rejected, (state, action) => {
        state.secondaryEmailOTPLoading = false;
        state.secondaryEmailOTPError = action.payload;
      })
      .addCase(Resend_OTP_Email_Verification.pending, (state) => {
        state.resendOTPLoading = true;
        state.resendOTPError = null;
      })
      .addCase(Resend_OTP_Email_Verification.fulfilled, (state, action) => {
        state.resendOTPLoading = false;
      })
      .addCase(Resend_OTP_Email_Verification.rejected, (state, action) => {
        state.resendOTPLoading = false;
        state.resendOTPError = action.payload;
      });
  },
});

export default verifyOTPSlice.reducer;
