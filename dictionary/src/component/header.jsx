import React from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { userId, handleLogout } = useAuth();

  const handleCreatePageRedirect = () => {
    window.location.href = '/create';
  };

  const handleLoginPageRedirect = () => {
    window.location.href = '/login';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header
      style={{
        background: '#5807C2',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid black',
      }}
    >
      <div
        style={{
          margin: '0',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '24px',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={handleLogoClick}
      >
        LexiLoom
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <form className="form-inline" style={{ marginRight: '10px', width: '50%' }}>
        </form>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          style={{
            background: '#fff',
            color: 'black',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
          }}
          onClick={handleCreatePageRedirect}
        >
          <i className="fas fa-plus" style={{ fontSize: '1.5em' }}></i>
        </button>
        {userId ? (
          <div
            style={{
              background: '#fff',
              color: 'black',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt" style={{ fontSize: '1.1em' }}></i>
          </div>
        ) : (
          <div
            style={{
              background: '#fff',
              color: 'black',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleLoginPageRedirect}
          >
            <i className="fas fa-user" style={{ fontSize: '1.1em' }}></i>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
