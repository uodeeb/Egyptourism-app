import React from "react";
import {StyleSheet, View } from "react-native";
import menu from "./menu.css"

class Menu extends React.Component {
state={
  //query: ''
}

// add marker to place list items

  render() {
// put state and props into variables
const { updateQuery} = this.props
let {  showingPlaces, data} = this.props
//const {query} = this.state
// add a filter contact function
//let showingPlaces
/*if(query){
    const match = new RegExp(escapeRegExp(query), 'i')
    showingPlaces = locations.filter((place)=> match.test(place.name))
}else{
    showingPlaces = locations
}
showingPlaces.sort(sortBy('name'))
*/

    return (
      <View 
      className="menu-bar"
      style={styles.bar}>
        <h3 style={{color: "#fff"}}>Find Delicious Food Around..</h3>
            <div 
            title="places navigation menu"
            aria-label="city list"
            style={{display: "flex", flex:1, flexDirection:"row"}}
            >
                <input 
                    className="search-locations"
                    type="search" aria-label="search text" 
                    //role="textbox"
                    placeholder="Search a Place"
                    value={this.props.query}
                    onChange={(event)=> updateQuery(event.target.value)}
                    style={{lineHeight: 1.5, borderRadius: 7,flex: 4,marginRight: 10 }}
                  />
                <button 
                id="myBtn"
                //role="button"
                tabIndex="0"
                aria-pressed="false"
                onClick={this.props.getFsquareData.bind(null, this.props.query)}
                style={{lineHeight: 1.5, borderRadius: 7, backgroundColor: "#1c262f", color: "#fff", flex: 2, marginRight: 10}}
                onKeyUp={(event)=> {
                    // Cancel the default action, if needed
                  event.preventDefault();
                  if (event.keyCode === 13) {
                    // Trigger the button element with a click
                    document.getElementById("myBtn").click();
                  }
                  this.props.getFsquareData.bind(null, this.props.query)}}
                  >Find
                </button>
                </div>
            <ol className="places-list"
                style={{color: "#fff"}}
                tabIndex="0"
        role="listbox"
              >
              {
                  showingPlaces.map((place)=>(
                    <li 
                        key={place.name}
                        style={{fontSize: '1.35em', lineHeight: 1.3, padding:5, cursor: "pointer"}}
                        className={this.addAnimation ? 'place' : 'animated shake'}
                        onClick={()=> updateQuery(place.name) }
                        aria-selected="false"
                        onMouseEnter={()=>this.addAnimation}
                        onMouseLeave={()=>this.addAnimation}
                       role="option"
                    >{place.name}
              
                                    </li>
                                ))}
</ol>

<ul

>
                    {data.map(venue =>{
                        return <li 
                                  key={venue.venue.id}
                                  className="clicked-place"
                                  style={{fontSize: "1em"}}
                                  role="option"
                                  aria-selected="false"
                                >
                                <div style={{COLOR: "#FFF" ,backgroundColor:"#1c262f" ,  borderRadius: 7}}>
                                <h3 >Territory: {venue.venue.location.city}</h3>
                                </div>
                                
                                Location: {venue.venue.name}
                                    <i
                                      key={venue.venue.name}
                                      style={{display: "block", color: "#4affff" }}
                                      role="menuitem"
                                    >
                                    > Address: {venue.venue.location.formattedAddress[0]}
                                    </i>
                                    <i
                                      key={venue.venue.name}
                                      style={{display: "block", color: "#4affff" }}
                                      role="menuitem"
                                    >
                                    > Distance: {venue.venue.location.distance}
                                    </i>
                                    <i
                                      key={venue.venue.name}
                                      style={{display: "block", color: "#4affff" }}
                                      role="menuitem"
                                    >
                                    > Cross-street: {venue.venue.location.crossStreet}
                                    </i>
                                    
                                </li>
                                        
                                    })}
                                            </ul>

      </View>




    ); 
  }
}
const styles = StyleSheet.create({
bar:{
  margin: 'auto',
  //marginTop: 10,
  padding: 5,
  



}
})
export default Menu;
