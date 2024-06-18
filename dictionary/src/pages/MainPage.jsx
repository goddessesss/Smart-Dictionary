import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MainPage.css';
import book from '../assets/book.jpg'; 

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="content-page">
        <div className="center-content">
          <div className="content-left">
            <div className="text">
              <h2>Welcome to the Word Learning Main Page!</h2>
              <p>
                Start your journey today and explore the joy of learning new words. 
                With our user-friendly interface and comprehensive content, you'll find 
                yourself mastering new words in no time.
              </p>
              <Link to="/login" className="btn btn-primary">Start Learning</Link>
            </div>
          </div>
          <div className="content-right">
            <img src={book} alt="book" className="book-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
