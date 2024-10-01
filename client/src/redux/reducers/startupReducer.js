import { createSlice } from "@reduxjs/toolkit";

const startupSlice = createSlice({
  name: "startup",
  initialState: {
    startups: [],
    startupDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setStartups: (state, action) => {
      state.startups = action.payload;
    },
    setStartupDetails: (state, action) => {
      state.startupDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStartups, setStartupDetails, setLoading, setError  } = startupSlice.actions;
export default startupSlice.reducer;