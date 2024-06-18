import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddToModuleModal = ({ show, onHide, modules, onAddToModule }) => {
  const [selectedModule, setSelectedModule] = useState('');

  const handleModuleSelect = () => {
    if (selectedModule) {
      onAddToModule(selectedModule);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          className="form-control"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="">Select a module...</option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.name}
            </option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleModuleSelect}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToModuleModal;
