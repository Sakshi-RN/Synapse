import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../config";
import { Api } from "../../apiList";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Thunk for fetching the cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      let token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${Config.baseUrl}/${Api.get_cart}`, {
        headers: {
          ...Config.appHeaders,
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for adding an item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async (itemData, { rejectWithValue }) => {
    const body = {
      products: [itemData],
    };
    try {
      let token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.add_or_update_item_from_cart}`,
        body,
        {
          headers: {
            ...Config.appHeaders,
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      let token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.remove_item_from_cart(itemId)}`,
        {},
        {
          headers: {
            ...Config.appHeaders,
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating item quantity in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (data, { rejectWithValue }) => {
    const body = {
      products: [data],
    };
    try {
      let token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.add_or_update_item_from_cart}`,
        body,
        {
          headers: {
            ...Config.appHeaders,
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  couponCode: "",
  couponDiscount: 0,
  orderTotal: 0,
  subTotal: 0,
  temporaryCheckoutCurrency: '',
  loading: {
    fetch: false,
    add: false,
    remove: false,
    updateQuantity: false,
  },
  error: {
    fetch: null,
    add: null,
    remove: null,
    updateQuantity: null,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart reducers
      .addCase(fetchCart.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.products = payload?.products;
        state.couponCode = payload?.coupon;
        state.orderTotal = payload?.orderTotal;
        state.subTotal = payload?.subTotal;
        state.couponDiscount = payload?.discount;
        state.temporaryCheckoutCurrency = payload?.temporaryCheckoutCurrency;
        state.loading.fetch = false;
        state.error.fetch = null;
      })
      .addCase(fetchCart.rejected, (state, { payload }) => {
        state.loading.fetch = false;
        state.error.fetch = payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        // state.products = payload.products;
        state.loading.add = false;
        state.error.add = null;
      })
      .addCase(addItemToCart.rejected, (state, { payload }) => {
        state.loading.add = false;
        state.error.add = payload;
      })
      // Remove from cart reducers
      .addCase(removeFromCart.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        // state.products = payload.products;
        state.loading.remove = false;
        state.error.remove = null;
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.loading.remove = false;
        state.error.remove = payload;
      })
      // Update item quantity reducers
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading.updateQuantity = true;
        state.error.updateQuantity = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, { payload }) => {
        // state.products = payload.products;
        state.loading.updateQuantity = false;
        state.error.updateQuantity = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, { payload }) => {
        state.loading.updateQuantity = false;
        state.error.updateQuantity = payload;
      });
  },
});

export const { resetState } = cartSlice.actions;
export default cartSlice.reducer;
