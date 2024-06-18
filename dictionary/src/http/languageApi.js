import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const getLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Language/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
