import React from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper, Animation, Icon} from "google-maps-react";


export class MapContainer extends React.Component {
  // add proptypes
  
    
 
  // add marker function
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markerLoc: [],
    

}

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
  
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

 
  render() {

const {locations}=this.props
let {showingPlaces, data}=this.props
const {markerLoc, activeMarker}=this.state

    return (
      
      <Map google={this.props.google}
      geocoder={this.props.geocoder}
          onClick={this.onMapClicked}
          initialCenter={{lat:30.06263, lng:31.24967 }}
          zoom={5}
           
          >
         {showingPlaces.map((place)=>(
          <Marker 
          key={place.id}
          className="marker"
          name={place.name}
          position={place.position}
          title={place.title}
          animation= {this.props.google.maps.Animation.DROP}
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
          onClick={this.onMarkerClick}  
            /> 
         ))}      
        {
          data.map((venue)=> ( 
            <Marker 
            key={venue.venue.id}
            className="marker"
            name={venue.venue.name}
            position={venue.venue.location.lat + venue.venue.location.lng}
            title={venue.venue.location.country}
          animation= {this.props.google.maps.Animation.DROP}
            />
          ))}
        <InfoWindow

          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p  style={{fontSize: '1em', lineHeight: 1.35, padding:5 ,maxWidth:"200px",
              wordWrap:"break-word"}}>
              {this.state.selectedPlace.description
              }
              </p>
            </div>
            
        </InfoWindow>

      </Map>
      
    );
   
  }
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A"
})(MapContainer);
