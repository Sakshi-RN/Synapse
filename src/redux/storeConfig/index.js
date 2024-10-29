import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authReducer";
import profileReducer from "../Reducers/profileReducer";
import phqReducer from '../Reducers/PHQReducer';
import logger from "redux-logger";
import AppointmentReducer from '../Reducers/AppointmentReducer';

const reducer = combineReducers({
   profile: profileReducer,
   Appointment:AppointmentReducer,
   phq: phqReducer,
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
