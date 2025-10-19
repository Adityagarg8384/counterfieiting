// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  isSeller: true,
  // token: null
  getToken: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {

      state.user = action.payload;

      console.log("User role:", action.payload?.publicMetadata);
      if (action.payload?.publicMetadata?.role === "seller") {
        state.isSeller = true;
      } else {
        state.isSeller = false;
      }
      state.user = action.payload; 
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsSeller: (state, action) => {
      state.isSeller = !!action.payload;
    },
    setGetToken: (state, action)=>{
       state.getToken= action.payload
    }
  },
});

export const { setUser, clearUser, setIsSeller, setGetToken } = userSlice.actions;
export default userSlice.reducer;
