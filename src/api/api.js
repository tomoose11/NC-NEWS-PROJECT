import axios from 'axios';

const BASE_URL = 'https://tom-nc-knews.herokuapp.com/api/';

export const getArticles = async (topic, query) => {
  console.log(`${BASE_URL}topics/${topic}/articles`);
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

export const voteOnComment = async (aid, cid, number) => {
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

// GET /api/topics/:topic/articles
// ```

// - responds with an array of article objects for a given topic
// - each article should have:
//     - `author` which is the `username` from the users table,
//     - `title`
//     - `article_id`
//     - `votes`
//     - `comment_count` which is the accumulated count of all the comments with this article_id.  You should make use of knex queries in order to achieve this.
//     - `created_at`
//     - `topic`

// Queries
// * This route should accept the following queries:
//     - `limit`, which limits the number of responses (defaults to 10)
//     - `sort_by`, which sorts the articles by any valid column (defaults to date)
//     - `p`, stands for page which specifies the page at which to start (calculated using limit)
//     - `sort_ascending`, when "true" returns the results sorted in ascending order (defaults to descending)
