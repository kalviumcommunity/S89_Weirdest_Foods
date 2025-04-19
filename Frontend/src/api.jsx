import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend URL

export const createFood = async (foodData) => {
  return await axios.post(`${API_URL}/foods`, foodData);
};

export const getFoodItems = async () => {
  return await axios.get(`${API_URL}/foods`);
};

export const updateFood = async (id, updatedData) => {
  return await axios.put(`${API_URL}/foods/${id}`, updatedData);
};

export const deleteFood = async (id) => {
  return await axios.delete(`${API_URL}/foods/${id}`);
};