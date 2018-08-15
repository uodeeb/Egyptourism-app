import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Geocoder from 'react-native-geocoding';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";


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
  // geocoder function
  getGeoData = () =>{
    Geocoder.init('AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A');
    Geocoder.from()
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));
  }
  /*onPlaceClicked = (props) =>{
    let address = document.getElementById('neighborhoods-select').children.value
    geocoder.geocode(
      { address: address,
        componentRestrictions: {locality: 'New York'}
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
  }*/
 
  render() {

//`const {locations}=this.state`
    return (
      
      <Map google={this.props.google}
      geocoder={this.props.geocoder}
          onClick={this.onMapClicked}
          initialCenter={{lat:30.06263, lng:31.24967 }}
          zoom={5}
           
          >
         
          <Marker 
        name="Giza"
        position={{lat:30.00808, lng:31.21093 }}
        title=" Giza is located in Egypt country"
        onClick={this.onMarkerClick}
          />
          
        <Marker 
        name="Aswan"
        position={{lat:24.09082, lng:32.89942  }}
        title=" Aswan is located in Egypt country"
        onClick={this.onMarkerClick}
        
        />
             
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
            </div>
        </InfoWindow>

      </Map>
      
    );
   
  }
}
const styles = StyleSheet.create({
marker:{
  
}

})

export default GoogleApiWrapper({
  apiKey: "AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A"
})(MapContainer);
