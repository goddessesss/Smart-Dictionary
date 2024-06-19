import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig'; 

export const createModuleTestGame = async (moduleId, wordsCount, answerOptionsCount, baseLanguageIso) => {
  try {
    const response = await axios.post(`${BASE_URL}/Module/game`, {
      moduleId: moduleId,
      wordsCount: wordsCount,
      answerOptionsCount: answerOptionsCount,
      baseLanguageIso: baseLanguageIso
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
