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

export const postTopic = async topic => {
  const { data } = await axios.post(`${BASE_URL}topics`, topic);
  return data;
};

export const vote = async (id, number) => {
  const { data } = await axios.patch(`${BASE_URL}articles/${id}`, {
    inc_votes: 1
  });
  return data;
};

// POST /api/topics/:topic/articles
// ```

// - accepts an object containing a `title` , `body` and a `user_id` property
// - responds with the posted article

// PATCH /api/articles/:article_id
// ```
// - accepts an object in the form `{  inc_votes: newVote  }`
//     - `newVote` will indicate how much the `votes` property in the database should be updated by
//     E.g  `{ inc_votes : 1 }` would increment the current article's vote property by 1
//          `{ inc_votes : -100 }` would decrement the current article's vote property by 100
