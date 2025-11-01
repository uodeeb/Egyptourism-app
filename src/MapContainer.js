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

const createCustomIcon = (isActive = false) => {
  const iconHtml = `
    <div style="
      background: ${isActive ? 'linear-gradient(135deg, #F5A623 0%, #D4774E 100%)' : 'linear-gradient(135deg, #006847 0%, #004D3D 100%)'};
      width: ${isActive ? '44px' : '36px'};
      height: ${isActive ? '44px' : '36px'};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    ">
      <div style="
        width: ${isActive ? '14px' : '10px'};
        height: ${isActive ? '14px' : '10px'};
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [isActive ? 44 : 36, isActive ? 44 : 36],
    iconAnchor: [isActive ? 22 : 18, isActive ? 44 : 36],
    popupAnchor: [0, isActive ? -44 : -36]
  });
};

export class MapContainer extends React.Component {
  state = {
    center: [30.06263, 31.24967],
    zoom: 7,
    activeMarker: null,
    mapStyle: 'streets'
  }

  mapRef = React.createRef();

  handleMarkerClick = (place) => {
    this.setState({ activeMarker: place.id });
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.setView(
        [place.position.lat, place.position.lng],
        10,
        { animate: true, duration: 1 }
      );
    }
  }

  toggleMapStyle = () => {
    this.setState(prevState => ({
      mapStyle: prevState.mapStyle === 'streets' ? 'satellite' : 'streets'
    }));
  }

generateNavigationUrl = (lat, lng, name) => {
    const encodedName = encodeURIComponent(name);
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      return `maps://maps.apple.com/?q=${encodedName}`;
    } else if (/Android/.test(navigator.userAgent)) {
      return `geo:0,0?q=${encodedName}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodedName}`;
  }

render() {
  let {showingPlaces}=this.props

      const tileUrls = {
        streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      };

      return (
      <div
      title="egypt cities map"
      tabIndex="-1"
      style={{ height: '100%', width: '100%', position: 'relative' }}
      >
          <button
            onClick={this.toggleMapStyle}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #006847 0%, #004D3D 100%)',
              color: '#F5F2E8',
              border: '2px solid #F5A623',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            }}
          >
            {this.state.mapStyle === 'streets' ? 'Satellite View' : 'Street View'}
          </button>
          <Map
              ref={this.mapRef}
              center={this.state.center}
              zoom={this.state.zoom}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
          >
            <TileLayer
              url={tileUrls[this.state.mapStyle]}
              attribution={this.state.mapStyle === 'streets' ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' : '&copy; Esri'}
              maxZoom={18}
            />

         {showingPlaces.map((place)=>(
                  <Marker
                  key={place.id}
                  position={[place.position.lat, place.position.lng]}
                  icon={createCustomIcon(this.state.activeMarker === place.id)}
                  onClick={() => this.handleMarkerClick(place)}
                  onMouseOver={(e) => {
                    e.target.openPopup();
                  }}
                  >
                    <Popup
                      onClose={() => this.setState({ activeMarker: null })}
                      maxWidth={340}
                      className="custom-popup"
                    >
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
