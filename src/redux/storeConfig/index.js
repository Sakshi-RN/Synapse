import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authReducer";
// import countryCodeReducer from "../Reducers/countryCodeReducer";
// import { productReducer } from "../Reducers/getetProductReducer/index";
// import userReducer from "../Reducers/userReducer";
// import carbonReducer from "../Reducers/carbonReducer";
// import cartReducer from "../Reducers/cartReducer";
import profileReducer from "../Reducers/profileReducer";
// import ChangeAddressFunc from "../Reducers/changeAddressReducer";
// import SearchReducer from "../Reducers/SearchReducer";
// import cartSlice from "../Reducers/getCartReducer";
import logger from "redux-logger";
// import wishlistReducer from "../Reducers/wishlistReducer";
// import CouponReducer from "../Reducers/CouponReducer";

const reducer = combineReducers({
  // auth: authReducer,
  // country: countryCodeReducer,
  // product: productReducer,
  // user: userReducer,
  // carbon: carbonReducer,
  // cart: cartReducer,
  profile: profileReducer,
  // address: ChangeAddressFunc,
  // search: SearchReducer,
  // Cart: cartSlice,
  // wishlist: wishlistReducer,
  // coupon: CouponReducer,
});

const thunkResponseLogger = (storeAPI) => (next) => async (action) => {
  if (typeof action === "function") {
    const result = await action(storeAPI.dispatch, storeAPI.getState);
    return result;
  }
  return next(action);
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkResponseLogger, logger),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }),
});

export default store;
