import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import MapContainer from "./MapContainer";

class App extends Component {
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.main}>
          <View style={styles.menu}>
            <Menu />
          </View>
          <View style={styles.mapcontainer}>
            <MapContainer />
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
    color: "#fff"
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
    backgroundColor: "#c1ffff",
  },
  footer: {
    height: "10%",
    backgroundColor: "#1c262f",
    color: '#fff',
    alignItems: "center",
  }
});

export default App;
