import axios from 'axios';

export const fetchAllRequests = async () => {
  const response = await axios.get(
    `https://parcels-manager.onrender.com/requests`,
  );
  return response.data.data;
};
