import React, { useState } from 'react';
import '../styles/ModuleDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function ModuleDetail() {
  const terms = ["Software", "Hyperlink", "Wireless","Hardware"];
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showTerm, setShowTerm] = useState(true);

  const definitions = [
    "Програмне забезпечення",
    "Гіперпосилання",
    "Бездротовий",
    "Апаратне забезпечення"
  ];

  const handleNextClick = () => {
    setCurrentTermIndex((prevIndex) => (prevIndex === terms.length - 1 ? 0 : prevIndex + 1));
    setShowDefinition(false);
  };

  const handlePrevClick = () => {
    setCurrentTermIndex((prevIndex) => (prevIndex === 0 ? terms.length - 1 : prevIndex - 1));
    setShowDefinition(false);
  };

  const handleCardClick = () => {
    setShowTerm(!showTerm);
  };

  return (
    <div className='detail-container'>
      <div className='detail-label'>
        Module 1. Information Technology
      </div>
      <button type="button" style={{ marginBottom: "10px" }} className="btn btn-primary">
        <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: "5px" }} />
        Test
      </button>
      <div className={`flashcard ${showTerm ? '' : 'show-value'}`} onClick={handleCardClick}>
        {showTerm ? (
          <h2>{terms[currentTermIndex]}</h2>
        ) : (
          <p>{definitions[currentTermIndex]}</p>
        )}
      </div>
      <div className='arrows-container'>
        <div className='arrows-wrapper'>
          <button className='arrow left' onClick={handlePrevClick}>
            <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
          </button>
          <p className="term-number">{`${currentTermIndex + 1}/${terms.length}`}</p>
          <button className='arrow right' onClick={handleNextClick}>
            <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
          </button>
        </div>
      </div>
      <div className='creator-info' style={{ fontSize: "20px", display: "flex", flexDirection: "column" }}>
        <div>
          <i className="fas fa-user"></i>
          Quiz-1234
        </div>
        <div style={{ marginLeft: "25px", color: "grey", fontSize: "10px" }}>Module created on July 4, 2023</div>
      </div>
      <hr className="short-hr" />
      <div className="words-in-module">
        <div className='worlds-label'>Words In Module</div>
        <table className="table">
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((term, index) => (
              <tr key={index}>
                <td>{term}</td>
                <td>{definitions[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
