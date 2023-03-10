import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedPosts } from "../../features/relatedPost/relatedPostSlice";
import Loading from "../ui/Loading";
import RelatedPostItem from "./RelatedPostItem";

export default function RelatedPostLists({ postId, tags }) {
  const { posts, isLoding, isError, error } = useSelector(
    (state) => state.relatedPosts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedPosts({ postId, tags }));
  }, [dispatch, postId, tags]);

  // decide what to do

  let content = null;

  if (isLoding) content = <Loading />;

  if (!isLoding && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoding && !isError && posts?.length === 0) {
    content = <div className="col-span-12">No videos Found!</div>;
  }

  if (!isLoding && !isError && posts?.length > 0) {
    content = posts.map((post) => (
      <RelatedPostItem post={post} key={post.id} />
    ));
  }

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">{content}</div>
    </aside>
  );
}
