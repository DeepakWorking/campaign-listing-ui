import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./AppReducer";

const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
});

export default store;
