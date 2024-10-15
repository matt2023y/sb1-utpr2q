import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

export const getTopics = async () => {
  const response = await axios.get(`${API_BASE_URL}/topics`);
  return response.data;
};

export const createTopic = async (topicName: string) => {
  const response = await axios.post(`${API_BASE_URL}/topics`, { name: topicName });
  return response.data;
};

export const deleteTopic = async (topicName: string) => {
  const response = await axios.delete(`${API_BASE_URL}/topics/${topicName}`);
  return response.data;
};