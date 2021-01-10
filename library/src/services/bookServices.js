import axios from "axios";
const baseUrl = "http://localhost:3001/api/books";

export const getFour = async () => {
  const response = await axios.get(`${baseUrl}?limit=4`);
  return response.data;
};

export const getPaginated = async (page, status) => {
  const response = await axios.get(`${baseUrl}?status=${status}&page=${page}`);
  return response.data;
};
