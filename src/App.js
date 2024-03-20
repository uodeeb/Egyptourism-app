import React, { Component } from "react";
import "./app.css";
import { StyleSheet, View } from "react-native";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import MapContainer from "./MapContainer";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import Axios from "axios";

class App extends Component {
  // main app constructor
  constructor(props) {
    super(props);
    this.state = {
      togglestate: true,
      showingPlaces: [],
      query: "",
      data: [],
      locations: [
        {
          id: 1,
          name: "Cairo",
          title: "Cairo is the capital of Egypt",
          position: { lat: 30.06263, lng: 31.24967 },
          description: {
            Country: "Egypt",
            Governorate: "Muhafazat al Qahirah",
            Population: "7,734,614",
            Elevation: "23 m over sea level",
            TimeZone: "EEST",
            Longitude: 31.24967,
            Latitude: 30.06263,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 2,
          name: "Giza",
          title: "Giza where pyramids located in Egypt",
          position: { lat: 30.00808, lng: 31.21093 },
          description: {
            Country: "Egypt",
            Governorate: "Al Jizah",
            Population: "2,443,203",
            Elevation: "	30 m over sea level",
            TimeZone: "EEST",
            Longitude: 31.21093,
            Latitude: 30.00808,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 3,
          name: "Alexandria",
          title: "Alexandria is the Mediterranean Sea shore of Egypt",
          position: { lat: 31.21564, lng: 29.95527 },
          description: {
            Country: "Egypt",
            Governorate: "	Alexandria",
            Population: "3,811,516",
            Elevation: "0 m over sea level",
            TimeZone: "EEST",
            Longitude: 29.95527,
            Latitude: 31.21564,
            Airport: "Borg El Arab Airport",
          },
        },
        {
          id: 4,
          name: "Hurghada",
          title: "Hurghada is the Red Sea shore of Egypt",
          position: { lat: 27.25738, lng: 33.81291 },
          description: {
            Country: "Egypt",
            Governorate: "Red Sea",
            Population: "95,622",
            Elevation: "11 m over sea level",
            TimeZone: "EEST",
            Longitude: 33.81291,
            Latitude: 27.25738,
            Airport: "Hurghada International Airport",
          },
        },
        {
          id: 5,
          name: "Aswan",
          title: "Aswan is a famous palace to visit in Egypt",
          position: { lat: 24.09082, lng: 32.89942 },
          description: {
            Country: "Egypt",
            Governorate: "Aswan",
            Population: "241,261",
            Elevation: "99 m over sea level",
            TimeZone: "EEST",
            Longitude: 32.89942,
            Latitude: 24.09082,
            Airport: "Aswan International Airport",
          },
        },
        {
          id: 6,
          name: "Al Fayyūm",
          title: "Al Fayum is a city found in Muhafazat al Fayyum, Egypt",
          position: { lat: 29.30995, lng: 30.8418 },
          description: {
            Country: "Egypt",
            Governorate: "Al Fayyūm",
            Population: "306,393",
            Elevation: "29 m over sea level",
            TimeZone: "EEST",
            Longitude: 30.8418,
            Latitude: 29.30995,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 7,
          name: "Al Minya",
          title: "Al Minya is a city found in Al Minya, Egypt",
          position: { lat: 28.10988, lng: 30.7503 },
          description: {
            Country: "Egypt",
            Governorate: "Al Minya",
            Population: "227,150",
            Elevation: "	49 m over sea level",
            TimeZone: "EEST",
            Longitude: 30.7503,
            Latitude: 28.10988,
            Airport: "El Minya Airport (EMY)",
          },
        },
        {
          id: 8,
          name: "Asyut",
          title: "Asyut is a city found in Asyut, Egypt",
          position: { lat: 27.18096, lng: 31.18368 },
          description: {
            Country: "Egypt",
            Governorate: "Asyut",
            Population: "420,585",
            Elevation: "	56 m over sea level",
            TimeZone: "EEST",
            Longitude: 31.18368,
            Latitude: 27.18096,
            Airport: "Assiut Airport (ATZ)",
          },
        },
        {
          id: 9,
          name: "Suez",
          title: "Suez is a city found in Al Suways, Egypt",
          position: { lat: 29.97371, lng: 32.52627 },
          description: {
            Country: "Egypt",
            Governorate: "	Al Suways",
            Population: "488,125",
            Elevation: "11 m over sea level",
            TimeZone: "EEST",
            Longitude: 32.52627,
            Latitude: 29.97371,
            Airport: "Port Said Airport (PSD)",
          },
        },
        {
          id: 10,
          name: "	Luxor",
          title: "Luxor is a city found in Luxor, Egypt",
          position: { lat: 25.69893, lng: 32.6421 },
          description: {
            Country: "Egypt",
            Governorate: "	Luxor",
            Population: "422,407",
            Elevation: "89 m over sea level",
            TimeZone: "EEST",
            Longitude: 32.6421,
            Latitude: 25.69893,
            Airport: "Luxor Airport (LXR)",
          },
        },
        {
          id: 11,
          name: "Marsa Matruh",
          title: "Marsa Matruh is a city found in Muhafazat Matruh, Egypt",
          position: { lat: 31.3529, lng: 27.23725 },
          description: {
            Country: "Egypt",
            Governorate: "Muhafazat Matruh",
            Population: "62,042",
            Elevation: "7 m over sea level",
            TimeZone: "EEST",
            Longitude: 27.23725,
            Latitude: 31.3529,
            Airport: "Marsa Matruh Airport (MUH)",
          },
        },
        {
          id: 12,
          name: "Al Mansurah",
          title:
            "Al Mansurah is a city found in Muhafazat ad Daqahliyah, Egypt",
          position: { lat: 31.03637, lng: 31.38069 },
          description: {
            Country: "Egypt",
            Governorate: "Muhafazat ad Daqahliyah",
            Population: "	420,195",
            Elevation: "15 m over sea level",
            TimeZone: "EEST",
            Longitude: 31.38069,
            Latitude: 31.03637,
            Airport: "Cairo International Airport",
          },
        },
      ],
    };
    this.togglestate = this.togglestate.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
  }

  // mount function
  componentDidMount = () => {
    this.getFsquareData();
  };

  //update the storage
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("data", JSON.stringify(nextState.data));
  }
  togglestate = (event) => {
    this.setState((prevState) => ({
      togglestate: !prevState.togglestate,
    }));
  };

  //fetch foursquare api function
  getFsquareData = (query) => {
    this.setState({
      data: [],
    });
    //
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "UCBUBFADHBK55015FZAGFQQVQRIVKVZ21HYB3YZF2EYUZ40M",
      client_secret: "RCC5E5DHSIX0QVB55JEIVICSVN5QVSVINR51AYMXW5LGJCZC",
      ll: "30.06263,31.24967",
      query: query,
      near: `${query},EG`,
      v: "20180323",
      limit: 50,
      section: "food",
    };
    // using axios to get the api data
    Axios.get(endPoint + new URLSearchParams(params))
      .then((response) => {
        console.log(response)
        this.setState({ data: response.data.response.groups[0].items });
      })
      .catch((error) => {
        // Code for handling errors
        console.log("this is not cool, api not responding", error);
      });
  };

  // add an update state function
  updateQuery = (query) => {
    this.setState({ query: query });
  };

  // add areset function
  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    // filter function
    const { data } = this.state;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      this.state.showingPlaces = this.state.locations.filter((place) =>
        match.test(place.name)
      );
    } else {
      this.state.showingPlaces = this.state.locations;
    }
    this.state.showingPlaces.sort(sortBy("name"));

    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <h1
            style={{ color: "#f2a739", marginBottom: 0 }}
            tabIndex="0"
            className={this.state.togglestate ? "head" : "animated jello"}
            alt="app name"
            onMouseEnter={this.togglestate}
            onMouseLeave={this.togglestate}
          >
            Egyptourism
          </h1>

          <Header />
        </View>
        <View style={styles.main} className="main">
          <View style={styles.menu}>
            <Menu
              tabIndex="1"
              className="menu-bar"
              locations={this.state.locations}
              addAimation={this.state.togglestate}
              query={this.state.query}
              updateQuery={this.updateQuery}
              clearQuery={this.clearQuery}
              showingPlaces={this.state.showingPlaces}
              filterQuery={this.filterQuery}
              getFsquareData={this.getFsquareData}
              data={data}
              changeQuery={this.changeQuery}
              title="city list"
            />
          </View>
          <View style={styles.mapcontainer}>
            <MapContainer
              className="map"
              locations={this.state.locations}
              query={this.state.query}
              updateQuery={this.updateQuery}
              clearQuery={this.clearQuery}
              showingPlaces={this.state.showingPlaces}
              data={data}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Footer className="footer" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },

  header: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#10131c",
  },

  main: {
    flex: 1,
    flexDirection: "row",
  },

  menu: {
    flex: 4,
    backgroundColor: "#2e3d49",
    overflow: "scroll",
    height: "100%",

    scrollbarWidth: 'none'  /* Firefox */
  },

  mapcontainer: {
    flex: 6,
    backgroundColor: "#ddf0f0",
    boxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)",
  },

  footer: {
    height: "10%",
    backgroundColor: "#1c262f",
    alignItems: "center",
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: "0.8em"
  },
});
// add proptype
App.propTypes = {
  togglestate: PropTypes.bool,
  showingPlaces: PropTypes.array,
  query: PropTypes.string,
  data: PropTypes.array,
  locations: PropTypes.array,
  updateQuery: PropTypes.func,
  clearQuery: PropTypes.func,
  getFsquareData: PropTypes.func,
};
export default App;
