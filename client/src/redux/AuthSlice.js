import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
};

const authSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
    },
    update: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
