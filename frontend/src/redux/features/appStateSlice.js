import { createSlice } from "@reduxjs/toolkit";

//init
const initialState = {
  tableNo: 1,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.tableNo = action.payload;
    },
  },
});

export const { setTable } = appStateSlice.actions;

export default appStateSlice.reducer;
