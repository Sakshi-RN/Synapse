import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Reducers/profileReducer";
import phqReducer from '../Reducers/PHQReducer';
import logger from "redux-logger";
import appointmentsReducer from '../Reducers/AppointmentReducer';


const reducer = combineReducers({
   profile: profileReducer,
   appointments: appointmentsReducer,
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
