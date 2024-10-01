import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    applications: [],
    governmentOfficials: [],
    loading: false,
    error: null,
  },
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setGovernmentOfficials: (state, action) => {
      state.governmentOfficials = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setApplications, setGovernmentOfficials, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;