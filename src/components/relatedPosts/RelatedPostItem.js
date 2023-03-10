import React from "react";
import { Link } from "react-router-dom";

export default function RelatedPostItem({ post }) {
  const { id, image, title, tags, createdAt } = post;
  return (
    <div className="card">
      <Link to={`/post/${id}`}>
        <img src={image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          {tags?.length > 0 &&
            tags.map((tag, index) => (
              <span key={index}>
                #{tag}
                {tags.length === index + 1 ? "" : ", "}
              </span>
            ))}
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
