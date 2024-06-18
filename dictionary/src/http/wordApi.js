import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const getUserWordsWithTranslations = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Word/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewWordWithTranslations = async (newWord) => {
  try {
    const response = await axios.post(`${BASE_URL}/Word`, newWord);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeWord = async (wordId) => {
  try {
    await axios.delete(`${BASE_URL}/Word/id/${wordId}`);
  } catch (error) {
    throw error;
  }
};

export const addWordToModule = async (wordId, moduleId) => {
  try {
    const response = await axios.post(`${BASE_URL}/Word/add-to-module-if-not-exists/${wordId}/${moduleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
