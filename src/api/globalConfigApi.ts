import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

export const getGlobalConfig = async () => {
  const response = await axios.get(`${API_BASE_URL}/global-config`);
  return response.data;
};

export const updateGlobalConfig = async (key: string, value: string) => {
  const response = await axios.put(`${API_BASE_URL}/global-config`, { key, value });
  return response.data;
};