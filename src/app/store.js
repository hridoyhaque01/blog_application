import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice";
import blogsReducer from "../features/blogs/blogsSlice";
import filterReducer from "../features/filter/filterSlice";
import relatedPostReducer from "../features/relatedPost/relatedPostSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    blog: blogReducer,
    relatedPosts: relatedPostReducer,
    filter: filterReducer,
  },
});
