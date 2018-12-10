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
