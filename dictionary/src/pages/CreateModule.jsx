import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createModule } from '../http/moduleApi';
import { useAuth } from '../context/AuthContext';
import { getLanguages } from '../http/languageApi';
import '../styles/CreateModule.css';

export default function CreateModule() {
  const { userId } = useAuth();

  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [wordPairs, setWordPairs] = useState([{ word: '', translation: '' }]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const languagesData = await getLanguages();
      setLanguages(languagesData);
    } catch (error) {
      console.error('Error fetching languages:', error);
      setError('Failed to fetch languages');
    }
  };

  const handleModuleNameChange = (e) => {
    setModuleName(e.target.value);
  };

  const handleModuleDescriptionChange = (e) => {
    setModuleDescription(e.target.value);
  };

  const handleWordChange = (index, e) => {
    const newWordPairs = [...wordPairs];
    newWordPairs[index].word = e.target.value;
    setWordPairs(newWordPairs);
  };

  const handleTranslationChange = (index, e) => {
    const newWordPairs = [...wordPairs];
    newWordPairs[index].translation = e.target.value;
    setWordPairs(newWordPairs);
  };

  const handleAddWordPair = () => {
    setWordPairs([...wordPairs, { word: '', translation: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newModule = {
        name: moduleName,
        description: moduleDescription,
        userId: userId,
        words: wordPairs.map(pair => ({
          name: pair.word,
          userId: userId,
          translations: [
            {
              languageIso: selectedLanguage,
              translationText: pair.translation
            }
          ]
        }))
      };

      await createModule(newModule);
      alert('Module created successfully'); 
      window.location.href = '/module'; 
    } catch (error) {
      console.error('Error creating module:', error);
      setError('Failed to create module');
    }
  };

  return (
    <div className="create-container">
      <div className='create-label'>Create Module</div>
      <Form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className='module-info-label'> Module Information</div>
          <Form.Group controlId="moduleName">
            <Form.Label>Module Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter module name"
              value={moduleName}
              onChange={handleModuleNameChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="moduleDescription" className="module-description">
            <Form.Label>Module Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter module description"
              value={moduleDescription}
              onChange={handleModuleDescriptionChange}
              required
            />
          </Form.Group>
        </div>

        <div className="form-section">
          <div className='word-pair-label'>Word Pair</div>
          {wordPairs.map((pair, index) => (
            <div key={index}>
              <Form.Group controlId={`word-${index}`} className="translation-word-margin">
                <Form.Label>Word №{index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter word"
                  value={pair.word}
                  onChange={(e) => handleWordChange(index, e)}
                  required
                />
              </Form.Group>
              <Form.Group controlId={`translation-${index}`}>
                <Form.Label>Translation №{index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter translation"
                  value={pair.translation}
                  onChange={(e) => handleTranslationChange(index, e)}
                  required
                />
              </Form.Group>
            </div>
          ))}

          <Button variant="btn btn-outline-primary" type="button" onClick={handleAddWordPair} className='add-word-button'>
            <FontAwesomeIcon icon={faPlus} /> Add Word Pair
          </Button>
        </div>

        <div className="form-section">
          <Form.Group controlId="languageSelect">
            <Form.Label>Select Language</Form.Label>
            <Form.Control
              as="select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              required
            >
              <option value="">Select Language</option>
              {languages.map((language, index) => (
                <option key={index} value={language.isoCode}>
                  {language.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}
