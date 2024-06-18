import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserWordsWithTranslations, removeWord, addWordToModule } from '../http/wordApi';
import { getUserModules } from '../http/moduleApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddWordModal from '../component/modals/addWordModals';
import AddToModuleModal from '../component/modals/AddToModuleModal';
import '../styles/Words.css';

export default function Words() {
  const { userId } = useAuth();
  const [words, setWords] = useState([]);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddToModuleModal, setShowAddToModuleModal] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState(null); 

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const fetchedWords = await getUserWordsWithTranslations(userId);
        setWords(fetchedWords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching words:', error);
        setError('Failed to fetch words');
        setLoading(false);
      }
    };

    const fetchModules = async () => {
      try {
        setLoading(true);
        const fetchedModules = await getUserModules(userId);
        setModules(fetchedModules);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setError('Failed to fetch modules');
        setLoading(false);
      }
    };

    if (userId) {
      fetchWords();
      fetchModules();
    }
  }, [userId]);

  const handleWordAdded = (addedWord) => {
    setWords([...words, addedWord]);
  };

  const handleRemoveWord = async (wordId) => {
    try {
      await removeWord(wordId);
      setWords(words.filter((word) => word.id !== wordId));
      alert('Word removed successfully');
    } catch (error) {
      console.error('Error removing word:', error);
      // Handle error
    }
  };

  const handleAddToModules = async (moduleId) => {
    if (!selectedWordId) {
      console.error('No word selected');
      return;
    }

    try {
      await addWordToModule(selectedWordId, moduleId);
      console.log('Word added to module successfully');
    } catch (error) {
      console.error('Error adding word to module:', error);
    } finally {
      setShowAddToModuleModal(false); 
    }
  };

  const openAddToModuleModal = (wordId) => {
    setShowAddToModuleModal(true);
    setSelectedWordId(wordId);
  };

  const closeAddToModuleModal = () => {
    setShowAddToModuleModal(false);
    setSelectedWordId(null); 
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Words with Translations</h2>
      <AddWordModal userId={userId} onWordAdded={handleWordAdded} />

      {words.length === 0 ? (
        <div  className="alert alert-info" role="alert">
          There are currently no words.
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Word</th>
              <th scope="col">Added on</th>
              <th scope="col">Translations</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id}>
                <td>{word.name}</td>
                <td>{new Date(word.addingTime).toLocaleString()}</td>
                <td>
                  <ul className="list-group">
                    {word.translations.map((translation) => (
                      <li key={translation.id} className="list-group-item">
                        <strong>{translation.language.name} ({translation.language.isoCode}):</strong>{' '}
                        {translation.translationText}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button className="btn btn-danger btn-action" onClick={() => handleRemoveWord(word.id)}>
                    Remove Word
                  </button>
                  <button
                    className="btn btn-primary btn-action"
                    onClick={() => openAddToModuleModal(word.id)}
                  >
                    Add to Module
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddToModuleModal
        show={showAddToModuleModal}
        onHide={closeAddToModuleModal}
        modules={modules}
        onAddToModule={handleAddToModules}
      />
    </div>
  );
}
