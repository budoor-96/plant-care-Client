
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import plantReducer from "../slices/plantSlice"; 

const plantCareStore = configureStore({
  reducer: {
    user: userReducer,
    plant: plantReducer
  }

});

export default plantCareStore;



