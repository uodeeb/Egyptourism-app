import React from 'react';
import PropTypes from 'prop-types';
import './PlacePopup.css';

const PlacePopup = ({ place }) => {
  const generateNavigationUrl = (lat, lng, name) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
  };

  return (
    <div className="place-popup">
      {place.images && place.images.length > 0 && (
        <div className="image-carousel">
          <img src={place.images[0]} alt={place.name} className="place-image" />
        </div>
      )}
      
      <h2 className="place-title">{place.name}</h2>
      <p className="place-overview">{place.description.overview}</p>
      
      {place.type === 'ATTRACTION' && (
        <div className="attraction-details">
          {place.description.openingHours && (
            <p className="detail-item">
              <strong>Hours:</strong> {place.description.openingHours}
            </p>
          )}
          {place.description.entryFee && (
            <p className="detail-item">
              <strong>Entry:</strong> {place.description.entryFee}
            </p>
          )}
          {place.description.bestTimeToVisit && (
            <p className="detail-item">
              <strong>Best Time:</strong> {place.description.bestTimeToVisit}
            </p>
          )}
          
          <a 
            href={generateNavigationUrl(place.position.lat, place.position.lng, place.name)}
            className="navigation-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigate to {place.name}
          </a>
        </div>
      )}
    </div>
  );
};

PlacePopup.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.shape({
      overview: PropTypes.string,
      openingHours: PropTypes.string,
      entryFee: PropTypes.string,
      bestTimeToVisit: PropTypes.string
    }),
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default PlacePopup;
