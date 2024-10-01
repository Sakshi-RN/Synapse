import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

// Thunk for fetching the wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.get(
        `${Config.baseUrl}/${Api.get_wishlist}`,
        {
          headers: {
            ...Config.appHeaders,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating the wishlist
export const updateWishlist = createAsyncThunk(
  "wishlist/updateWishlist",
  async (wishlistData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.update_wishlist}`,
        wishlistData,
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
  products: [],
  wishlistLoading: false,
  wishlistError: null,
  updateWishlistLoading: false,
  updateWishlistError: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.wishlistLoading = true;
        state.wishlistError = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistError = action.payload;
      })
      // Update wishlist
      .addCase(updateWishlist.pending, (state) => {
        state.updateWishlistLoading = true;
        state.updateWishlistError = null;
      })
      .addCase(updateWishlist.fulfilled, (state, action) => {
        state.updateWishlistLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(updateWishlist.rejected, (state, action) => {
        state.updateWishlistLoading = false;
        state.updateWishlistError = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
