import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

// Thunk for updating the primary email
export const Change_Primary_Email = createAsyncThunk(
  "email/ChangePrimaryEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.updatePrimaryEmail}`,
        emailData,
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

// Thunk for updating the secondary email
export const Change_Secondary_Email = createAsyncThunk(
  "email/ChangeSecondaryEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.updateSecondaryEmail}`,
        emailData,
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
  primaryEmail: "",
  secondaryEmail: "",
  primaryEmailLoading: false,
  primaryEmailError: null,
  secondaryEmailLoading: false,
  secondaryEmailError: null,
};

const changeEmailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    Set_Email_Field(state, action) {
      const { field, value } = action.payload;
      if (state[field] !== value) {
        state[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Change_Primary_Email.pending, (state) => {
        state.primaryEmailLoading = true;
        state.primaryEmailError = null;
      })
      .addCase(Change_Primary_Email.fulfilled, (state, action) => {
        state.primaryEmailLoading = false;
        state.primaryEmail = action.payload.email;
      })
      .addCase(Change_Primary_Email.rejected, (state, action) => {
        state.primaryEmailLoading = false;
        state.primaryEmailError = action.payload;
      })
      .addCase(Change_Secondary_Email.pending, (state) => {
        state.secondaryEmailLoading = true;
        state.secondaryEmailError = null;
      })
      .addCase(Change_Secondary_Email.fulfilled, (state, action) => {
        state.secondaryEmailLoading = false;
        state.secondaryEmail = action.payload.email;
      })
      .addCase(Change_Secondary_Email.rejected, (state, action) => {
        state.secondaryEmailLoading = false;
        state.secondaryEmailError = action.payload;
      });
  },
});

export const { Set_Email_Field } = changeEmailSlice.actions;

export default changeEmailSlice.reducer;
