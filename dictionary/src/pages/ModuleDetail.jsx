import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ModuleDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faGraduationCap, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getModuleDetails, deleteModule, deleteWordFromModule } from '../http/moduleApi'; 
import { useAuth } from '../context/AuthContext';

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const { username } = useAuth();

  const [moduleDetails, setModuleDetails] = useState(null);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showTerm, setShowTerm] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const module = await getModuleDetails(moduleId);
        setModuleDetails(module);
      } catch (error) {
        console.error('Error fetching module details:', error);
        setError('Failed to fetch module details');
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const handleNextClick = () => {
    setCurrentTermIndex(prevIndex => (prevIndex === (moduleDetails?.words?.length ?? 0) - 1 ? 0 : prevIndex + 1));
    setShowDefinition(false);
  };

  const handlePrevClick = () => {
    setCurrentTermIndex(prevIndex => (prevIndex === 0 ? (moduleDetails?.words?.length ?? 0) - 1 : prevIndex - 1));
    setShowDefinition(false);
  };

  const handleCardClick = () => {
    setShowTerm(!showTerm);
  };

  const handleDeleteModule = async () => {
    try {
      await deleteModule(moduleId);
      console.log('Module deleted successfully');
      alert('Module deleted successfully');
      window.location.href = '/module'; 
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  const handleDeleteWord = async (wordId) => {
    try {
      await deleteWordFromModule(moduleId, wordId);
      alert('Word in module deleted successfully');

      setModuleDetails(prevModule => ({
        ...prevModule,
        words: prevModule.words.filter(wordObj => wordObj.word.id !== wordId)
      }));
      console.log('Word deleted successfully');
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!moduleDetails) {
    return <div className="loading-message">Loading module details...</div>;
  }

  if (moduleDetails.words?.length === 0) {
    return (
      <div className='detail-container'>
        <div className='detail-label'>
          Module {moduleDetails.id}. {moduleDetails.name}
        </div>
        <div className="empty-module-message">
          <p>This module is empty.</p>
        </div>
        <div className='button-group'>
          {moduleDetails.id && (
            <button type="button" className="btn btn-danger" onClick={handleDeleteModule}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='detail-container '>
      <div className='detail-label'>
        Module {moduleDetails.id}. {moduleDetails.name}
      </div>
      <div className="button-group"  style={{marginBottom:"15px"}}>
        <button type="button" className="btn btn-primary">
          <FontAwesomeIcon icon={faGraduationCap}  />
          Test
        </button>
        {moduleDetails.id && (
          <button type="button" style={{ marginLeft: "5px" }}className="btn btn-danger" onClick={handleDeleteModule}>
            <FontAwesomeIcon icon={faTrash}  />
            Delete
          </button>
        )}
      </div>
      <div className={`flashcard ${showTerm ? '' : 'show-value'}`} onClick={handleCardClick}>
        {showTerm ? (
          <h2>{moduleDetails.words[currentTermIndex]?.word?.name}</h2>
        ) : (
          <p>{moduleDetails.words[currentTermIndex]?.word?.translations[0]?.translationText}</p>
        )}
      </div>
      <div className='arrows-container'>
        <div className='arrows-wrapper'>
          <button className='arrow left' onClick={handlePrevClick}>
            <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
          </button>
          <p className="term-number">{`${currentTermIndex + 1}/${moduleDetails.words?.length ?? 0}`}</p>
          <button className='arrow right' onClick={handleNextClick}>
            <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
          </button>
        </div>
      </div>
      <div className='creator-info'>
        <div>
          <i className="fas fa-user"></i>
          {username}
        </div>
      </div>
      <hr className="short-hr" />
      <div className="words-in-module">
        <div className='words-label'>Words In Module {moduleDetails.words?.length ?? 0}</div>
        <table className="table">
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {moduleDetails.words?.map((wordObj, index) => (
              <tr key={index}>
                <td>{wordObj?.word?.name}</td>
                <td>{wordObj?.word?.translations[0]?.translationText}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteWord(wordObj.word.id)}
                    style={{ marginLeft: '10px' }} 
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
