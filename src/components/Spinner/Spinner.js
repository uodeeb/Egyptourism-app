import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p className="spinner-text">Loading...</p>
  </div>
);

export default Spinner;