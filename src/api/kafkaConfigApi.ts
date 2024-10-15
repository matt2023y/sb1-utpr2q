import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

export const getKafkaConfig = async () => {
  const response = await axios.get(`${API_BASE_URL}/kafka/config`);
  return response.data;
};

export const updateKafkaConfig = async (key: string, value: string) => {
  const response = await axios.put(`${API_BASE_URL}/kafka/config`, { key, value });
  return response.data;
};