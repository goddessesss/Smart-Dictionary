import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addNewWordWithTranslations } from '../../http/wordApi'; 
import { getLanguages } from '../../http/languageApi'; 

export default function AddWord({ userId, onWordAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [wordName, setWordName] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [languageError, setLanguageError] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languages = await getLanguages();
        setLanguages(languages);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setError('Failed to fetch languages');
      }
    };

    fetchLanguages();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setWordName('');
    setNewTranslation('');
    setSelectedLanguage('');
    setError(null);
    setLanguageError('');
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLanguage) {
      setLanguageError('Please select a language');
      return;
    }
    try {
      setLoading(true);
      const newWord = {
        name: wordName,
        userId,
        translations: [{ translationText: newTranslation, languageIso: selectedLanguage }],
      };
      const addedWord = await addNewWordWithTranslations(newWord);
      onWordAdded(addedWord);
      handleClose();
      alert("New word created successfully!")
    } catch (error) {
      console.error('Error adding word:', error);
      setError('Failed to add word');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{marginBottom:"20px"}}>
        Add New Word
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Word with Translation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="wordName" className="mb-3">
              <Form.Label>Word Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter word name"
                value={wordName}
                onChange={(e) => setWordName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="newTranslation" className="mb-3">
              <Form.Label>Translation Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter translation text"
                value={newTranslation}
                onChange={(e) => setNewTranslation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="languageIso" className="mb-3">
              <Form.Label>Language ISO Code</Form.Label>
              <Form.Control
                as="select"
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setLanguageError('');
                }}
                required
                isInvalid={!!languageError}
              >
                <option value="">Select language ISO code</option>
                {languages.map((language) => (
                  <option key={language.isoCode} value={language.isoCode}>
                    {language.name} ({language.isoCode})
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{languageError}</Form.Control.Feedback>
            </Form.Group>

            <div className="mb-3">
              
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Word'}
              </Button>
            </div>
          </Form>

          {error && <div className="mt-3 text-danger">{error}</div>}
        </Modal.Body>
      </Modal>
    </>
  );
}
