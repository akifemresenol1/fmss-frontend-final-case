import axios from './axios';

export const searchStarship = async (query) => {
  return axios.get(`/starships/?search=${query}`);
};

export const getStarships = async () => {
  return axios.get(`/starships`);
};

export const loadMoreStarship = async (url) => {
  return axios.get(url);
};

export const REACT_APP_API_BASE_URL =''