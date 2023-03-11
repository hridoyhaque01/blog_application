import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlog, setUpdatedLikes, setUpdatedSaved } from "./blogAPI";

const initialState = {
  blog: {},
  isLoding: false,
  isError: false,
  error: "",
};

// create async thunk function

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async (blogId) => {
  const blog = await getBlog(blogId);
  return blog;
});

export const updatedLikes = createAsyncThunk(
  "blog/updatedLikes",
  async ({ id, likes }) => {
    const updatedLike = await setUpdatedLikes(id, likes);
    return updatedLike;
  }
);

export const updatedSaved = createAsyncThunk(
  "blog/updatedSaved",
  async ({ id, isSaved }) => {
    const updatedSaved = await setUpdatedSaved(id, isSaved);
    return updatedSaved;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.isLoding = true;
        state.isError = false;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.error = "";
        state.blog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blog = {};
      })
      .addCase(updatedLikes.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(updatedLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.error = "";
        state.blog.likes = action.payload.likes;
      })
      .addCase(updatedLikes.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updatedSaved.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(updatedSaved.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.error = "";
        state.blog.isSaved = action.payload.isSaved;
      })
      .addCase(updatedSaved.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
