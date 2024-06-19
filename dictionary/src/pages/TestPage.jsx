import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getModuleDetails } from '../http/moduleApi'; 
import '../styles/TestPage.css';

export default function TestPage() {
  const { moduleId } = useParams();
  const [moduleDetails, setModuleDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const module = await getModuleDetails(moduleId);
        setModuleDetails(module);
        setOptions(generateOptions(module.words, 0));
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const generateOptions = (words, correctIndex) => {
    const correctAnswer = words[correctIndex].word.translations[0].translationText;
    const incorrectAnswers = words
      .filter((_, index) => index !== correctIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(wordObj => wordObj.word.translations[0].translationText);

    const allOptions = [...incorrectAnswers, correctAnswer].sort(() => 0.5 - Math.random());
    return allOptions;
  };

  const handleAnswerSelect = (answer) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    setSelectedAnswer(answer);
    setIsCorrect(
      answer.trim().toLowerCase() === moduleDetails.words[currentQuestionIndex].word.translations[0].translationText.trim().toLowerCase()
    );

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex === moduleDetails.words.length) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setOptions(generateOptions(moduleDetails.words, nextIndex));
    }
  };

  if (!moduleDetails) {
    return <div className="loading-message">Loading module details...</div>;
  }

  if (showResults) {
    return (
      <div className="test-results">
        <h2>Test Completed</h2>
        <p>Your Score: {score} / {moduleDetails.words.length}</p>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="centered-content">
        <div className="test-container">
          <div className="test-label">Module Test: {moduleDetails.name}</div>
          <div className="question">
            <div className="question-number">
              Question №{currentQuestionIndex + 1}: What is the definition of "{moduleDetails.words[currentQuestionIndex].word.name}"?
            </div>
            <div className="answers">
              {options.map((option, index) => (
                <button 
                  key={index} 
                  className={`answer ${selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={answeredQuestions.includes(currentQuestionIndex)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button style={{marginTop:"20px"}} className="btn btn-primary" onClick={handleNextQuestion} disabled={!selectedAnswer}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
