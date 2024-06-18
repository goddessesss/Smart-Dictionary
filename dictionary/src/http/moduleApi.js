import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const getUserModules = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Module/all/user/${userId}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const getModuleDetails = async (moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Module/details/${moduleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createModule = async (newModule) => {
  try {
    const response = await axios.post(`${BASE_URL}/Module`, newModule);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteModule = async (moduleId) => {
  try {
    await axios.delete(`${BASE_URL}/Module/${moduleId}`);
    console.log('Module deleted successfully');
  } catch (error) {
    throw error;
  }
};

export const getModuleWordsCount = async (moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Module/words-count/${moduleId}`);
    return response.data.count; 
  } catch (error) {
    throw error;
  }
};

export const deleteWordFromModule = async (moduleId, wordId) => {
  try {
    await axios.delete(`${BASE_URL}/Module/${moduleId}/word/${wordId}`);
    console.log('Word removed from module successfully');
  } catch (error) {
    console.error('Error deleting word:', error);
    throw error; 
  }
};
