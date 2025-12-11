
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import plantReducer from "../slices/plantSlice"; // Updated slice for plants

const plantCareStore = configureStore({
  reducer: {
    user: userReducer,
    plant: plantReducer
  }

});

export default plantCareStore;


