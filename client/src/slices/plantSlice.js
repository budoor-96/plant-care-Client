import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:7500";

// Add Plant with Image
export const addPlantThunk = createAsyncThunk("plant/addPlant", async (formData) => {
  const response = await axios.post(`${API_URL}/plants`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data; // { message, plant }
});

// Fetch Plants
export const fetchPlantsThunk = createAsyncThunk("plant/fetchPlants", async (userId) => {
  const response = await axios.get(`${API_URL}/plants/${userId}`);
  return response.data; // array of plants
});

// Update Plant with Image
export const updatePlantThunk = createAsyncThunk("plant/updatePlant", async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}/plants/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data; // updated plant
});

//Delete Plant
export const deletePlantThunk = createAsyncThunk("plant/deletePlant", async (id) => {
  const response = await axios.delete(`${API_URL}/plants/${id}`);
  return { id, message: response.data.message };
});

const plantSlice = createSlice({
  name: "plant",
  initialState: { plants: [], msg: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    // Add Plant
    builder.addCase(addPlantThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPlantThunk.fulfilled, (state, action) => {
      state.plants.push(action.payload.plant);
      state.msg = action.payload.message;
      state.loading = false;
    });
    builder.addCase(addPlantThunk.rejected, (state, action) => {
      state.msg = action.error.message;
      state.loading = false;
    });

    // Fetch Plants
    builder.addCase(fetchPlantsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlantsThunk.fulfilled, (state, action) => {
      state.plants = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPlantsThunk.rejected, (state, action) => {
      state.msg = action.error.message;
      state.loading = false;
    });

    // Update Plant
    builder.addCase(updatePlantThunk.fulfilled, (state, action) => {
      const index = state.plants.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.plants[index] = action.payload;
    });

    // Delete Plant
    builder.addCase(deletePlantThunk.fulfilled, (state, action) => {
      state.plants = state.plants.filter((p) => p._id !== action.payload.id);
      state.msg = action.payload.message;
    });
  }
});

export default plantSlice.reducer;
