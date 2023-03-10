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

export const fetchUpdatedLikes = createAsyncThunk(
  "blog/fetchUpdatedLikes",
  async ({ id, likes }) => {
    const updatedLike = await setUpdatedLikes({ id, likes });
    return updatedLike;
  }
);

export const fetchUpdatedSaved = createAsyncThunk(
  "blog/fetchUpdatedSaved",
  async ({ id, isSaved }) => {
    const updatedSaved = await setUpdatedSaved({ id, isSaved });
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
      .addCase(fetchUpdatedLikes.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUpdatedLikes.fulfilled, (state, action) => {
        state.blog.likes = action.payload.likes;
        state.loading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchUpdatedLikes.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(fetchUpdatedSaved.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUpdatedSaved.fulfilled, (state, action) => {
        state.blog.isSaved = action.payload.isSaved;
        state.loading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchUpdatedSaved.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
