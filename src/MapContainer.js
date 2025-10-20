import React from "react";
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";


export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markerLoc: [],
    mapStyles: [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{"color": "#F5F2E8"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#4A90A4"}]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"color": "#F5F2E8"}]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"color": "#ffffff"}, {"lightness": 20}]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#ebe9e1"}]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#d4e8d4"}]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#2C2C2C"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#8B8B7A"}]
      }
    ]
  }
// add function to show infowindow
onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
  
});
 // close infowindow when map clicked
onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
    })
  }
};

// main component render function
render() {
  let {showingPlaces}=this.props

      return (
      <div 
      title="egypt cities map"
      tabIndex="-1"
      >
      
          <Map
              tabIndex="2"
              google={this.props.google}
              title="search city location"
              onClick={this.onMapClicked}
              initialCenter={{lat:30.06263, lng:31.24967 }}
              zoom={7}
              styles={this.state.mapStyles}
          >
      
         {showingPlaces.map((place)=>(
                  <Marker 
                  tabIndex="0"
                  key={place.id}
                  className="marker"
                  name={place.name}
                  position={place.position}
                  title={place.title}
                  animation= {this.props.google.maps.Animation.DROP}
                  onClick={this.onMarkerClick}  
                  description=
                                {
                            "Country: " + place.description.Country+", Governorate: "+ 
                          place.description.Governorate +", Population: "+
                          place.description.Population +", Elevation: "+
                          place.description.Elevation +", TimeZone: "+
                          place.description.TimeZone +", Longitude: "+
                          place.description.Longitude +", Latitude: "+
                          place.description.Latitude +", Airport: "+
                          place.description.Airport 
                          }
                        />  
                ))}      
        
                    <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                                <div style={{
                                  padding: 16,
                                  fontFamily: "'Inter', sans-serif",
                                  background: "#FEFDF8",
                                  borderRadius: 8,
                                  border: "2px solid #F5A623",
                                }}>
                                  <h2 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: "#006847",
                                    fontSize: "1.3rem",
                                    margin: "0 0 8px 0",
                                    fontWeight: 700,
                                  }}>
                                    {this.state.selectedPlace.name}
                                  </h2>
                                  <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    maxWidth:"280px",
                                    wordWrap:"break-word",
                                    color: "#2C2C2C",
                                  }}>
                                    {this.state.selectedPlace.description}
                                  </p>
                                </div>
            
                      </InfoWindow>
       
          </Map>
      
      </div> 
    );
   
  }
}
// add proptypes
MapContainer.propTypes= {
  showingInfoWindow: PropTypes.bool,
  activeMarker: PropTypes.object,
  selectedPlace: PropTypes.object,
  markerLoc: PropTypes.array,
}

// supply needed keys for google maps
export default GoogleApiWrapper({
  apiKey: "AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A"
})(MapContainer);
