import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getRelatedPost from "./relatedPostAPI";

const initialState = {
  posts: [],
  isLoding: false,
  isError: false,
  error: "",
};

// create async thunk function

export const fetchRelatedPosts = createAsyncThunk(
  "relatedPost/fetchRelatedPosts",
  async ({ postId, tags }) => {
    const posts = await getRelatedPost({ postId, tags });
    return posts;
  }
);

const relatedPostSlice = createSlice({
  name: "relatedPost",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPosts.pending, (state) => {
        state.isLoding = true;
        state.isError = false;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.error = action.error?.message;
        state.posts = [];
      });
  },
});

export default relatedPostSlice.reducer;
