import React from 'react';

function Header() {
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
      <div style={{ margin: '0', fontFamily: "'Poppins', sans-serif", fontSize: '24px', color: '#fff' }}>
        Smart Dictionary
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <form className="form-inline" style={{ marginRight: '10px', width: '50%' }}>
        </form>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={{ background: '#fff', color: 'black', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
          <i className="fas fa-plus" style={{ fontSize: '1.5em' }}></i>
        </button>
        <div style={{ background: '#fff', color: 'black', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <i className="fas fa-user" style={{ fontSize: '1.1em' }}></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
