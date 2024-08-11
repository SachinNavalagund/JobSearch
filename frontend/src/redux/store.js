import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationSlice from "./applicationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
    application: applicationSlice,
  },
});

export default store;
