import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {},
  reducers: {
    sayHello: (state) => {
      console.log("sayHello");
    },
  },
});

// Action creators are generated for each case reducer function
export const { sayHello } = generalSlice.actions;

export default generalSlice.reducer;
