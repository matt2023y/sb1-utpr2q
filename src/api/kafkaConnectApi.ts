import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

export const getConnectors = async () => {
  const response = await axios.get(`${API_BASE_URL}/connectors`);
  return response.data;
};

export const createConnector = async (connectorName: string) => {
  const response = await axios.post(`${API_BASE_URL}/connectors`, { name: connectorName });
  return response.data;
};

export const pauseConnector = async (connectorName: string) => {
  const response = await axios.put(`${API_BASE_URL}/connectors/${connectorName}/pause`);
  return response.data;
};

export const resumeConnector = async (connectorName: string) => {
  const response = await axios.put(`${API_BASE_URL}/connectors/${connectorName}/resume`);
  return response.data;
};

export const deleteConnector = async (connectorName: string) => {
  const response = await axios.delete(`${API_BASE_URL}/connectors/${connectorName}`);
  return response.data;
};