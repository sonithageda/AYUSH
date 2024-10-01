import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },

  reducers: {
    setUserInfo: (state, action) => {   
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  
});
export const { setUserInfo, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;