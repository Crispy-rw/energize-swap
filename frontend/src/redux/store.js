import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import { backendApis } from "./features/apiSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    [backendApis.reducerPath]: backendApis.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApis.middleware) 
});