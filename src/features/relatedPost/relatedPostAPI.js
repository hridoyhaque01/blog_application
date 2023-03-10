import axios from "../../utils/axios";

const getRelatedPost = async ({ postId, tags }) => {
  const queryString =
    tags?.length > 0
      ? tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${postId}`
      : `&id_ne=${postId}`;
  const response = await axios.get(`/blogs?${queryString}`);
  return response.data;
};

export default getRelatedPost;
