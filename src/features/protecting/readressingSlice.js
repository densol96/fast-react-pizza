import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readressing: false,
};

const readressingSlice = createSlice({
  name: "readressing",
  initialState,
  reducers: {
    updateReadressingStatus(state, action) {
      state.readressing = action.payload;
    },
  },
});

export const { updateReadressingStatus } = readressingSlice.actions;

export default readressingSlice.reducer;
