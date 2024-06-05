import React from 'react';
import '../styles/MainPage.css'; 

export default function MainPage() {
  return (
    <div className='main-page-container'>
      <div className='title'>Your Modules</div>
      <div className='main-page'>
        <div className='container'> 
          <div className='container-label'>
            Module 1. Information Technology
          </div>
          <div className='container-count'>
            32 terms
          </div>
          <div className='creator-info' style={{ fontSize: "14px", alignItems:"center" }}>
          <i className="fas fa-user" ></i>
          Quiz-1234
          </div>
        </div>

        <div className='container'> 
          <div className='container-label'>
            Module 2. Artificial Intelligence
          </div>
          <div className='container-count'>
            12 terms
          </div>
          <div className='creator-info'>
          <i className="fas fa-user" ></i>
          Quiz-1234
          </div>
        </div>
        
        <div className='container'> 
          <div className='container-label'>
            Module 3. Data Science
          </div>
          <div className='container-count'>
            9 terms
          </div>
          <div className='creator-info'>
          <i className="fas fa-user"></i>
          Quiz-1234
          </div>
        </div>

        <div className='container'> 
          <div className='container-label'>
            Module 4. Cyber Security
          </div>
          <div className='container-count'>
            43 terms
          </div>
          <div className='creator-info'>
          <i className="fas fa-user"></i>
          Quiz-1234
          </div>
        </div>
      </div>

      <div className='section-title'>We Recommend</div>
      <div className='recommend-page'>
        <div className='container'> 
          <div className='container-label'>
            Module 5. Blockchain Technology
          </div>
          <div className='container-count'>
            20 terms
          </div>
          <div className='creator-info'>
          <i className="fas fa-user"></i>
            Lasssa
          </div>
        </div>

        <div className='container'> 
          <div className='container-label'>
            Module 6. Quantum Computing
          </div>
          <div className='container-count'>
            33 terms
          </div>
          <div className='creator-info'>
          <i className="fas fa-user"></i>
            Kate123
          </div>
        </div>
      </div>
    </div>
  );
}
