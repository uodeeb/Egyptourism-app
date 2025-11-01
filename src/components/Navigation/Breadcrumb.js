import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

const Breadcrumb = ({ path, onNavigate }) => (
  <nav aria-label="Location hierarchy" className="breadcrumb-nav">
    <ol className="breadcrumb-list">
      {path.map((item, index) => (
        <li key={item.id} className="breadcrumb-item">
          <button 
            onClick={() => onNavigate(item)}
            className={`breadcrumb-button ${index === path.length - 1 ? 'current' : ''}`}
            aria-current={index === path.length - 1 ? 'page' : undefined}
          >
            {item.name}
          </button>
          {index < path.length - 1 && (
            <span className="breadcrumb-separator" aria-hidden="true">›</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default Breadcrumb;
