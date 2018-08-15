import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import MapContainer from "./MapContainer";

class App extends Component {
   // constructor
   constructor(props) {
    super(props);
    this.state = {
      togglestate: true,
      locations: [{
        id: 1,
        name: "Cairo",
        title: "Cairo is the capital of Egypt",
        position:{lat: 30.06263, lng: 31.24967}
            },{
              id: 2,
        name: "Giza",
        title: "Giza where pyramids located in Egypt",
        position:{lat:30.00808, lng:31.21093 }
      },{
        id: 3,
        name: "Alexandria",
        title: "Alexandria is the Meditrainian Sea shore of Egypt",
        position:{lat: 31.21564, lng: 29.95527}
      },{
        id: 4,
        name: "Hurghada",
        title: "Hurghada is the Red Sea shore of Egypt",
        position:{lat: 27.25738, lng: 33.81291}
      },{
        id: 5,
        name: "Aswan",
        title: "Aswan is a famous palace to visit in Egypt",
        position:{lat:24.09082, lng:32.89942  }
      }],
    }
    this.togglestate = this.togglestate.bind(this);
  }

  togglestate(event) {
    this.setState((prevState) => ({
      togglestate: !prevState.togglestate
    }));
  }
  //


     

  render() {
    return (
      <View style={styles.app}>
      
        <View style={styles.header}
        
        >
        <h1 
        tabindex="0" 
        className={this.state.togglestate ? 'static-logo' : 'static-logo animated jello'} 
            alt="logo"
            onMouseEnter={this.togglestate}
            onMouseLeave={this.togglestate}
        
        >Neighbourhood App</h1>
          <Header 
         
          />
        </View>
        <View style={styles.main}>
          <View style={styles.menu}>
            <Menu 
            locations={this.state.locations}
            toggleColor={this.state.togglestate}
            />
          </View>
          <View style={styles.mapcontainer}>
            <MapContainer 
         
          
            />
          </View>
        </View>
        <View style={styles.footer}>
<Footer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    //marginHorizontal: "auto",
    //maxWidth: 500,
    flex: 1
  },
  header: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1c262f",
    color: "#fff",
    
  },
  main: {
    flex: 1,
    flexDirection: "row"
  },
  menu: {
    flex: 2,
    backgroundColor: "#2e3d49",
    
  
  },
  mapcontainer: {
    flex: 5,
    backgroundColor: "#ddf0f0" ,
    webkitBoxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)",
    mozBoxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)",
    boxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)"
  },
  footer: {
    height: "10%",
    backgroundColor: "#1c262f",
    color: '#fff',
    alignItems: "center",
  },
 
});

export default App;
