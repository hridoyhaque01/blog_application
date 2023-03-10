import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchUpdatedLikes,
  fetchUpdatedSaved,
} from "../../features/blog/blogSlice";

export default function DetailedPost({ blog }) {
  const dispatch = useDispatch();
  const { title, image, description, tags, likes, isSaved, id } = blog;

  const likeHandler = () => {
    dispatch(fetchUpdatedLikes({ id, likes }));
  };

  const savedHandler = () => {
    dispatch(fetchUpdatedSaved({ id, isSaved }));
  };

  return (
    <main className="post">
      <img
        src={image}
        alt="githum"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          {tags?.length > 0 &&
            tags.map((tag, index) => (
              <span key={index}>
                #{tag}
                {tags.length === index + 1 ? "" : ", "}
              </span>
            ))}
        </div>
        <div className="btn-group">
          <button
            className="like-btn"
            id="lws-singleLinks"
            onClick={likeHandler}
          >
            <i className="fa-regular fa-thumbs-up"></i> {likes}
          </button>

          <button
            className={`${isSaved && "active"} save-btn`}
            id="lws-singleSavedBtn"
            onClick={savedHandler}
          >
            <i className="fa-regular fa-bookmark"></i>
            {isSaved ? " Saved" : " Save"}
          </button>
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
