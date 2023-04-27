import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/blogs/blogsSlice";
import Loading from "../ui/Loading";
import BlogItem from "./BlogItem";

export default function BlogLists() {
  const { blogs, isLoding, isError, error } = useSelector(
    (state) => state.blogs
  );
  const { sort, status } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  //decide what to render

  let content = null;

  if (isLoding) content = <Loading />;

  if (!isLoding && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoding && !isError && blogs?.length === 0) {
    content = <div className="col-span-12">No videos Found!</div>;
  }

  if (!isLoding && !isError && blogs?.length > 0) {
    
    const sortBlogs = () => {
      switch (sort) {
        case "newest":
          return blogs.slice().sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

        case "most_liked":
          return blogs.slice().sort((a, b) => b.likes - a.likes);

        default:
          return blogs;
      }
    };

    const filterByStatus = (blog) => {
      if (status === "saved") {
        return blog.isSaved;
      } else {
        return true;
      }
    };

    const sortedBlogs = sortBlogs();
    content = sortedBlogs
      .filter(filterByStatus)
      .map((blog) => <BlogItem key={blog.id} blog={blog} />);
  }

  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
}
