import axios from 'axios';

export const fetchAllRequests = async () => {
  const response = await axios.get(`http://localhost:3000/requests`);
  return response.data.data;
};
