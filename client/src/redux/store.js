import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import startupReducer from "./reducers/startupReducer";
import dashboardReducer from "./reducers/dashboardReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    startup: startupReducer,
    dashboard: dashboardReducer,
  },
});

export default store;