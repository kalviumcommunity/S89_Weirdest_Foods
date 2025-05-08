import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Base URL
const ROUTES_URL = `${API_URL}/routes`; // Routes endpoint
const AUTH_URL = `${API_URL}/auth`; // Auth endpoint

// Set auth token for requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Authentication functions
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
    }
    return response;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Get all users for dropdown
export const getAllUsers = async () => {
  try {
    return await axios.get(`${AUTH_URL}/users`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
    }
    return response;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Create a new food item
export const createFood = async (foodData) => {
  try {
    return await axios.post(`${ROUTES_URL}/foods`, foodData);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Get all food items
export const getFoodItems = async (userId = null) => {
  try {
    const url = userId
      ? `${ROUTES_URL}/foods?userId=${userId}`
      : `${ROUTES_URL}/foods`;
    return await axios.get(url);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Get a single food item by ID
export const getFoodById = async (id) => {
  try {
    return await axios.get(`${ROUTES_URL}/foods/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Update a food item
export const updateFood = async (id, updatedData) => {
  try {
    return await axios.put(`${ROUTES_URL}/foods/${id}`, updatedData);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Delete a food item
export const deleteFood = async (id) => {
  try {
    return await axios.delete(`${ROUTES_URL}/foods/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    console.error('Status:', error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error Message:', error.message);
  }
};