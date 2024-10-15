import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

export const getZookeeperStatus = async () => {
  const response = await axios.get(`${API_BASE_URL}/zookeeper/status`);
  return response.data;
};