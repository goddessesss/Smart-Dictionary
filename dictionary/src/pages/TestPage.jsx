import React, { useState, useEffect } from 'react';
import '../styles/TestPage.css';

const terms = ["Software", "Hyperlink", "Wireless", "Hardware"];
const definitions = [
  "Програмне забезпечення",
  "Гіперпосилання",
  "Бездротовий",
  "Апаратне забезпечення"
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1);
      } else {
        setShowScore(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerOptionClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (nextQuestion < terms.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const progressWidth = (timeRemaining / 10) * 100 + '%';

  return (
    <div className="test-container">
      {!showScore ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{terms.length}
            </div>
            <div className="choose-text">Choose the correct answer:</div>
            <div className="question-text">{terms[currentQuestion]}</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: progressWidth }}></div>
            </div>
          </div>
          <div className="answer-section">
            {definitions.map((option, index) => (
              <button
                key={index}
                className="answer-button"
                onClick={() => handleAnswerOptionClick(index === currentQuestion)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="score-section">
          You scored {score} out of {terms.length}
        </div>
      )}
    </div>
  );
}
