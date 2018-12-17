import axios from 'axios';

const BASE_URL = 'https://tom-nc-knews.herokuapp.com/api/';

export const getArticles = async (topic, query) => {
  const { data } = topic
    ? await axios.get(`${BASE_URL}topics/${topic}/articles${query}`)
    : await axios.get(`${BASE_URL}articles${query}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}topics`);
  return data;
};

export const getSingleArticle = async id => {
  const { data } = await axios.get(`${BASE_URL}articles/${id}`);
  return data;
};

export const getCommentsForArticle = async id => {
  const { data } = await axios.get(`${BASE_URL}articles/${id}/comments`);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}users`);
  return data;
};

export const postArticle = async (article, topic) => {
  const { data } = await axios.post(
    `${BASE_URL}topics/${topic}/articles`,
    article
  );
  return data;
};

export const postTopic = async topic => {
  const { data } = await axios.post(`${BASE_URL}topics`, topic);
  return data;
};

export const vote = async (id, number) => {
  const { data } = await axios.patch(`${BASE_URL}articles/${id}`, {
    inc_votes: number
  });
  return data;
};

export const voteOnComment = async (aid, number, cid) => {
  const { data } = await axios.patch(
    `${BASE_URL}articles/${aid}/comments/${cid}`,
    {
      inc_votes: number
    }
  );
  return data;
};

export const deleteArticle = async id => {
  const { data } = await axios.delete(`${BASE_URL}articles/${id}`);
  return data;
};

export const postComment = async (id, comment) => {
  const { data } = await axios.post(
    `${BASE_URL}articles/${id}/comments`,
    comment
  );
  return data;
};

export const deleteComment = async id => {
  const { data } = await axios.delete(`${BASE_URL}comments/${id}`);
  return data;
};
