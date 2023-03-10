import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailedPost from "../components/description/DetailedPost";
import RelatedPostLists from "../components/relatedPosts/RelatedPostLists";
import BackToHome from "../components/ui/BackToHome";
import Loading from "../components/ui/Loading";
import { fetchBlog } from "../features/blog/blogSlice";

export default function Posts() {
  const { isLoding, isError, blog, error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchBlog(postId));
  }, [dispatch, postId]);

  //decide what to do

  let content = null;

  if (isLoding) content = <Loading />;

  if (!isLoding && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoding && !isError && !blog?.id) {
    content = <div className="col-span-12">No videos Found!</div>;
  }

  if (!isLoding && !isError && blog?.id) {
    content = (
      <section className="post-page-container">
        <DetailedPost blog={blog} />
        <RelatedPostLists postId={blog.id} tags={blog.tags} />
      </section>
    );
  }

  return (
    <>
      <BackToHome />
      {content}
    </>
  );
}
