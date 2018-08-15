import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
class Menu extends React.Component {
state={
  query: ''
}
// add an update state function
updateQuery = (query)=>{
  this.setState({query: query})
}
// add areset function
clearQuery = ()=>{
  this.setState({query: '' })
}
// add marker to place list items

  render() {
// put state and props into variables
const {locations, toggleColor} = this.props
const {query} = this.state
// add a filter contact function
let showingPlaces
if(query){
    const match = new RegExp(escapeRegExp(query), 'i')
    showingPlaces = locations.filter((place)=> match.test(place.name))
}else{
    showingPlaces = locations
}
showingPlaces.sort(sortBy('name'))

    return (
      <View style={styles.bar}>
      <h3 style={{color: "#fff"}}>Choose a Place to Visit in Egypt</h3>
      <input 
      className="search-locations"
      type="text"
      placeholder="search places"
      value={query}
      onChange={(event)=> this.updateQuery(event.target.value)}
  />
<ol className="places-list"
style={{color: "#fff"}}
>
{showingPlaces.map((place)=>(
  <li 
  style={{fontSize: '1.5em', lineHeight: 1.5, padding:5}}
  className={this.state.togglestate ? 'static-logo' : 'static-logo animated shake'} 

  onMouseOver={toggleColor}
 
    >{place.name}</li>
))}




</ol>



      </View>




    );
  }
}
const styles = StyleSheet.create({
bar:{
  margin: 'auto',
  marginTop: 20,
  padding: 10,
  



}
})
export default Menu;
