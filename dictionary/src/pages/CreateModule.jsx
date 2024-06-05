import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/CreateModule.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CreateModule() {
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [wordPairs, setWordPairs] = useState([{ word: '', translation: '' }]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
                />
              </Form.Group>
              <Form.Group controlId={`translation-${index}`}>
                <Form.Label>Translation №{index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter translation"
                  value={pair.translation}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </Form.Group>
            </div>
          ))}

          <Button variant="btn btn-outline-primary" type="button" onClick={handleAddWordPair} className='add-word-button'>
            <FontAwesomeIcon icon={faPlus} /> 
          </Button>
        </div>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}
