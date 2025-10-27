import React from "react";
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = new L.Icon({
  iconUrl: require('./new-marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export class MapContainer extends React.Component {
  state = {
    center: [30.06263, 31.24967],
    zoom: 7
  }

generateNavigationUrl = (lat, lng, name) => {
    const encodedName = encodeURIComponent(name);
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      return `maps://maps.apple.com/?q=${encodedName}&ll=${lat},${lng}`;
    } else if (/Android/.test(navigator.userAgent)) {
      return `geo:${lat},${lng}?q=${lat},${lng}(${encodedName})`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

render() {
  let {showingPlaces}=this.props

      return (
      <div
      title="egypt cities map"
      tabIndex="-1"
      style={{ height: '100%', width: '100%' }}
      >
          <Map
              center={this.state.center}
              zoom={this.state.zoom}
              style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

         {showingPlaces.map((place)=>(
                  <Marker
                  key={place.id}
                  position={[place.position.lat, place.position.lng]}
                  icon={customIcon}
                  >
                    <Popup>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        minWidth: "280px",
                      }}>
                        <h2 style={{
                          fontFamily: "'Playfair Display', serif",
                          color: "#006847",
                          fontSize: "1.3rem",
                          margin: "0 0 12px 0",
                          fontWeight: 700,
                        }}>
                          {place.name}
                        </h2>
                        <p style={{
                          fontSize: '0.85rem',
                          lineHeight: 1.6,
                          margin: "0 0 12px 0",
                          color: "#2C2C2C",
                        }}>
                          {place.title}
                        </p>
                        <div style={{
                          fontSize: '0.8rem',
                          lineHeight: 1.6,
                          color: "#555",
                          marginBottom: 12,
                        }}>
                          <p style={{ margin: "4px 0" }}><strong>Country:</strong> {place.description.Country}</p>
                          <p style={{ margin: "4px 0" }}><strong>Governorate:</strong> {place.description.Governorate}</p>
                          <p style={{ margin: "4px 0" }}><strong>Population:</strong> {place.description.Population}</p>
                          <p style={{ margin: "4px 0" }}><strong>Elevation:</strong> {place.description.Elevation}</p>
                          <p style={{ margin: "4px 0" }}><strong>Airport:</strong> {place.description.Airport}</p>
                          <p style={{ margin: "4px 0" }}><strong>Coordinates:</strong> {place.position.lat.toFixed(4)}, {place.position.lng.toFixed(4)}</p>
                        </div>
                        <a
                          href={this.generateNavigationUrl(place.position.lat, place.position.lng, place.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            background: "linear-gradient(135deg, #F5A623 0%, #D4774E 100%)",
                            color: "#2C2C2C",
                            textDecoration: "none",
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            textAlign: "center",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          Navigate to {place.name}
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
          </Map>
      </div>
    );
  }
}
MapContainer.propTypes= {
  showingPlaces: PropTypes.array,
}

export default MapContainer;
