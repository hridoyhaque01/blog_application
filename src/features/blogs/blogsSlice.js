// initial state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBlogs from "./blogsAPI";

const initialState = {
  blogs: [],
  isLoding: false,
  isError: false,
  error: "",
};

// create async thunk function

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogs = await getBlogs();
  return blogs;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoding = true;
        state.isError = false;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.error = "";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blogs = [];
      });
  },
});

export default blogsSlice.reducer;
