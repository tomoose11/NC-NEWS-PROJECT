import axios from 'axios';

const BASE_URL = 'https://tom-nc-knews.herokuapp.com/api/';

export const getArticles = async topic => {
  console.log(`${BASE_URL}topics/${topic}/articles`);
  const { data } = topic
    ? await axios.get(`${BASE_URL}topics/${topic}/articles`)
    : await axios.get(`${BASE_URL}articles`);
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

export const postArticle = async article => {
  const { data } = await axios.post(
    `${BASE_URL}topics/football/articles`,
    article
  );
  return data;
};

// POST /api/topics/:topic/articles
// ```

// - accepts an object containing a `title` , `body` and a `user_id` property
// - responds with the posted article
