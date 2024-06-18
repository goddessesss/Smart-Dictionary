import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/ModulePage.css';
import { useAuth } from '../context/AuthContext';
import { getUserModules } from '../http/moduleApi'; 

export default function ModulePage() {
  const { userId, username } = useAuth();
  const [userModules, setUserModules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserModules = async () => {
      try {
        if (userId) {
          const modules = await getUserModules(userId);
          setUserModules(modules);
        }
      } catch (error) {
        console.error('Error fetching user modules:', error);
        setError(error.message);
      }
    };

    fetchUserModules();
  }, [userId]);

  return (
    <div className='module-page-container'>
      <div className='title'>Your Modules</div>
      <Link to="/word" className="btn btn-primary view-words-button" style={{ marginBottom: "50px" }}>
        View Added Words
      </Link>
      <div className='module-page'>
        {error ? (
          <div className="error-message">
            Failed to fetch modules: {error}
          </div>
        ) : userModules.length === 0 ? (
          <div className="no-modules-message">
            Currently, there are no modules created.
          </div>
        ) : (
          userModules.map(module => (
            <Link key={module.id} to={`/module/${module.id}`} className='module-link'>
              <div className='container-module'>
                <div className='container-label'>
                  {module.name}
                </div>
                <div className='container-desc'>
                  {module.descriptions}
                </div>
                <div className='creator-info' style={{ fontSize: "14px", alignItems: "center" }}>
                  <i className="fas fa-user"></i>
                  {username}
                </div>
                <Link to={`/module/${module.id}`} className="view-words-link">
                </Link>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
