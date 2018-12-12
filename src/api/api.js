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

// ```http
// GET /api/articles/:article_id/comments
// ```
// - responds with an array of comments for the given `article_id`
// - each comment should have
//     - `comment_id`
//     - `votes`
//     - `created_at`
//     - `author` which is the `username` from the users table
//     - `body`

// Queries
// * This route should accept the following queries:
//  - limit, which limits the number of responses (defaults to 10)
//  - sort_by, which sorts the articles by any valid column (defaults to date)
//  - p, stands for page which specifies the page at which to start (calculated using limit)
//  - sort_ascending, when "true" returns the results sorted in ascending order (defaults to descending)

// ```http
// POST /api/articles/:article_id/comments
// ```
// - accepts an object with `article_id`,`user_id` and `body`
// - responds with the posted comment

// ```http
// PATCH /api/comments/:comment_id
// ```

// - accepts an object in the form `{  inc_votes: newVote  }`
//     - `newVote` will indicate how much the `votes` property in the database should be updated by
//     E.g  `{ inc_votes : 1 }` would increment the current article's vote property by 1
//          `{ inc_votes : -1 }` would decrement the current article's vote property by 1

// ```http
// DELETE /api/comments/:comment_id
// ```

// - should delete the given comment by `comment_id`
// - should respond with an empty object

// ```http
// GET /api/users
// ```
// - should respond with an array of user objects
// - each user object should have
//     - `user_id`
//     - `username`
//     - `avatar_url`
//     - `name`

// ```http
// GET /api/users/:username
// ```

// - should respond with a user object
// - each user should have
//     - `user_id`
//     - `username`
//     - `avatar_url`
//     - `name`

// ```http
// GET /api
// ```
// - Serves JSON describing all the available endpoints on your API
