import axios from "../../utils/axios";

const getBlog = async (blogId) => {
  const response = await axios.get(`/blogs/${blogId}`);
  return response.data;
};

const setUpdatedLikes = async ({ id, likes }) => {
  const response = await axios.patch(`/blogs/${id}`, {
    likes: likes + 1,
  });
  return response.data;
};

const setUpdatedSaved = async ({ id, isSaved }) => {
  const response = await axios.patch(`/blogs/${id}`, {
    isSaved: !isSaved,
  });
  return response.data;
};

export { getBlog, setUpdatedLikes, setUpdatedSaved };
