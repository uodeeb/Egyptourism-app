import React from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  // add marker function
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
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
    return (
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{lat:30.06263, lng:31.24967 }}
          zoom={5}
          >
        <Marker onClick={this.onMarkerClick}
                name={'Giza'} 
                position={{lat:30.00808, lng:31.21093}}
             
                />
                <Marker onClick={this.onMarkerClick}
                name={'Alexandria'}
                position={{lat:31.21564, lng:29.95527}} 
                 
                />
                <Marker onClick={this.onMarkerClick}
                name={'Cairo'} 
                position={{lat:30.06263, lng:31.24967 }} 
                />
                <Marker onClick={this.onMarkerClick}
                name={'Hurghada'} 
                position={{lat:27.25738, lng:33.81291

                  }} 
                />
                <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
                position={{lat:24.09082, lng:32.89942 }} 
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A"
})(MapContainer);
