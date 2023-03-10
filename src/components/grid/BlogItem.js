import React from "react";
import { Link } from "react-router-dom";

export default function BlogItem({ blog }) {
  const { id, image, title, createdAt, likes, tags, isSaved } = blog;
  return (
    <div className="lws-card">
      <Link to={`/post/${id}`}>
        <img src={image} className="lws-card-image" alt={title} />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i className="fa-regular fa-thumbs-up"></i>
            {likes}
          </p>
        </div>
        <Link to={`/post/${id}`} className="lws-postTitle">
          {title}
        </Link>
        <div className="lws-tags">
          {tags?.length > 0 &&
            tags.map((tag, index) => (
              <span key={index}>
                #{tag}
                {tags.length === index + 1 ? "" : ", "}
              </span>
            ))}
        </div>
        {isSaved && (
          <div className="flex gap-2 mt-4">
            <span className="lws-badge"> Saved </span>
          </div>
        )}
      </div>
    </div>
  );
}
