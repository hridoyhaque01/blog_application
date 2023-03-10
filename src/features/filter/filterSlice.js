import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "",
  status: "all",
};

const filterSlice = createSlice({
  name: "relatedPost",
  initialState,
  reducers: {
    sorted: (state, action) => {
      state.sort = action.payload;
    },
    statusChanged: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { sorted, statusChanged } = filterSlice.actions;
