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
import { additionalCities } from './data/additionalCities';

class App extends Component {
  // main app constructor
  constructor(props) {
    super(props);
    this.state = {
      togglestate: true,
      showingPlaces: [],
      query: "",
      data: [],
      loading: false,
      error: null,
      selectedCity: null,
      locations: [
        ...additionalCities,
        {
          id: 1,
          name: "Cairo",
          title: "Cairo - The City of a Thousand Minarets",
          position: { lat: 30.06263, lng: 31.24967 },
          description: {
            Country: "Egypt",
            Governorate: "Cairo",
            Population: "9,500,000",
            Elevation: "23 m",
            TimeZone: "EEST",
            Longitude: 31.24967,
            Latitude: 30.06263,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 2,
          name: "Giza",
          title: "Giza - Home of the Great Pyramids",
          position: { lat: 30.00808, lng: 31.21093 },
          description: {
            Country: "Egypt",
            Governorate: "Giza",
            Population: "8,800,000",
            Elevation: "30 m",
            TimeZone: "EEST",
            Longitude: 31.21093,
            Latitude: 30.00808,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 3,
          name: "Alexandria",
          title: "Alexandria - Pearl of the Mediterranean",
          position: { lat: 31.21564, lng: 29.95527 },
          description: {
            Country: "Egypt",
            Governorate: "Alexandria",
            Population: "5,200,000",
            Elevation: "0 m",
            TimeZone: "EEST",
            Longitude: 29.95527,
            Latitude: 31.21564,
            Airport: "Borg El Arab Airport",
          },
        },
        {
          id: 4,
          name: "Hurghada",
          title: "Hurghada - Red Sea Resort Paradise",
          position: { lat: 27.25738, lng: 33.81291 },
          description: {
            Country: "Egypt",
            Governorate: "Red Sea",
            Population: "280,000",
            Elevation: "11 m",
            TimeZone: "EEST",
            Longitude: 33.81291,
            Latitude: 27.25738,
            Airport: "Hurghada International Airport",
          },
        },
        {
          id: 5,
          name: "Aswan",
          title: "Aswan - Gateway to Ancient Nubia",
          position: { lat: 24.09082, lng: 32.89942 },
          description: {
            Country: "Egypt",
            Governorate: "Aswan",
            Population: "290,000",
            Elevation: "99 m",
            TimeZone: "EEST",
            Longitude: 32.89942,
            Latitude: 24.09082,
            Airport: "Aswan International Airport",
          },
        },
        {
          id: 6,
          name: "Luxor",
          title: "Luxor - World's Greatest Open-Air Museum",
          position: { lat: 25.69893, lng: 32.6421 },
          description: {
            Country: "Egypt",
            Governorate: "Luxor",
            Population: "506,000",
            Elevation: "89 m",
            TimeZone: "EEST",
            Longitude: 32.6421,
            Latitude: 25.69893,
            Airport: "Luxor International Airport",
          },
        },
        {
          id: 7,
          name: "Port Said",
          title: "Port Said - Gateway to the Suez Canal",
          position: { lat: 31.26550, lng: 32.30129 },
          description: {
            Country: "Egypt",
            Governorate: "Port Said",
            Population: "750,000",
            Elevation: "1 m",
            TimeZone: "EEST",
            Longitude: 32.30129,
            Latitude: 31.26550,
            Airport: "Port Said Airport",
          },
        },
        {
          id: 8,
          name: "Suez",
          title: "Suez - Historic Canal City",
          position: { lat: 29.97371, lng: 32.52627 },
          description: {
            Country: "Egypt",
            Governorate: "Suez",
            Population: "728,000",
            Elevation: "11 m",
            TimeZone: "EEST",
            Longitude: 32.52627,
            Latitude: 29.97371,
            Airport: "Port Said Airport",
          },
        },
        {
          id: 9,
          name: "Sharm El Sheikh",
          title: "Sharm El Sheikh - Sinai Peninsula Jewel",
          position: { lat: 27.91582, lng: 34.32995 },
          description: {
            Country: "Egypt",
            Governorate: "South Sinai",
            Population: "73,000",
            Elevation: "10 m",
            TimeZone: "EEST",
            Longitude: 34.32995,
            Latitude: 27.91582,
            Airport: "Sharm El Sheikh International Airport",
          },
        },
        {
          id: 10,
          name: "Tanta",
          title: "Tanta - Heart of the Nile Delta",
          position: { lat: 30.78617, lng: 31.00152 },
          description: {
            Country: "Egypt",
            Governorate: "Gharbia",
            Population: "658,000",
            Elevation: "15 m",
            TimeZone: "EEST",
            Longitude: 31.00152,
            Latitude: 30.78617,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 11,
          name: "Ismailia",
          title: "Ismailia - City of Beauty and Enchantment",
          position: { lat: 30.58316, lng: 32.26535 },
          description: {
            Country: "Egypt",
            Governorate: "Ismailia",
            Population: "750,000",
            Elevation: "5 m",
            TimeZone: "EEST",
            Longitude: 32.26535,
            Latitude: 30.58316,
            Airport: "Ismailia Airport",
          },
        },
        {
          id: 12,
          name: "Faiyum",
          title: "Faiyum - Ancient Oasis City",
          position: { lat: 29.30995, lng: 30.8418 },
          description: {
            Country: "Egypt",
            Governorate: "Faiyum",
            Population: "475,000",
            Elevation: "29 m",
            TimeZone: "EEST",
            Longitude: 30.8418,
            Latitude: 29.30995,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 13,
          name: "Zagazig",
          title: "Zagazig - Agricultural Hub of Egypt",
          position: { lat: 30.58768, lng: 31.50214 },
          description: {
            Country: "Egypt",
            Governorate: "Sharqia",
            Population: "628,000",
            Elevation: "15 m",
            TimeZone: "EEST",
            Longitude: 31.50214,
            Latitude: 30.58768,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 14,
          name: "Mansoura",
          title: "Mansoura - Victorious City",
          position: { lat: 31.03637, lng: 31.38069 },
          description: {
            Country: "Egypt",
            Governorate: "Dakahlia",
            Population: "960,000",
            Elevation: "15 m",
            TimeZone: "EEST",
            Longitude: 31.38069,
            Latitude: 31.03637,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 15,
          name: "Asyut",
          title: "Asyut - Gateway to Upper Egypt",
          position: { lat: 27.18096, lng: 31.18368 },
          description: {
            Country: "Egypt",
            Governorate: "Asyut",
            Population: "600,000",
            Elevation: "56 m",
            TimeZone: "EEST",
            Longitude: 31.18368,
            Latitude: 27.18096,
            Airport: "Asyut Airport",
          },
        },
        {
          id: 16,
          name: "Damanhur",
          title: "Damanhur - Historic Beheira Capital",
          position: { lat: 31.03408, lng: 30.46823 },
          description: {
            Country: "Egypt",
            Governorate: "Beheira",
            Population: "743,000",
            Elevation: "8 m",
            TimeZone: "EEST",
            Longitude: 30.46823,
            Latitude: 31.03408,
            Airport: "Borg El Arab Airport",
          },
        },
        {
          id: 17,
          name: "Minya",
          title: "Minya - Bride of Upper Egypt",
          position: { lat: 28.10988, lng: 30.7503 },
          description: {
            Country: "Egypt",
            Governorate: "Minya",
            Population: "335,000",
            Elevation: "49 m",
            TimeZone: "EEST",
            Longitude: 30.7503,
            Latitude: 28.10988,
            Airport: "Minya Airport",
          },
        },
        {
          id: 18,
          name: "Damietta",
          title: "Damietta - Furniture Capital of Egypt",
          position: { lat: 31.41648, lng: 31.81332 },
          description: {
            Country: "Egypt",
            Governorate: "Damietta",
            Population: "700,000",
            Elevation: "3 m",
            TimeZone: "EEST",
            Longitude: 31.81332,
            Latitude: 31.41648,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 19,
          name: "Beni Suef",
          title: "Beni Suef - City of Upper Egypt",
          position: { lat: 29.07730, lng: 31.09580 },
          description: {
            Country: "Egypt",
            Governorate: "Beni Suef",
            Population: "320,000",
            Elevation: "31 m",
            TimeZone: "EEST",
            Longitude: 31.09580,
            Latitude: 29.07730,
            Airport: "Cairo International Airport",
          },
        },
        {
          id: 20,
          name: "Qena",
          title: "Qena - Gateway to the Red Sea",
          position: { lat: 26.16420, lng: 32.71590 },
          description: {
            Country: "Egypt",
            Governorate: "Qena",
            Population: "380,000",
            Elevation: "68 m",
            TimeZone: "EEST",
            Longitude: 32.71590,
            Latitude: 26.16420,
            Airport: "Luxor International Airport",
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

  getFsquareData = (query) => {
    if (!query) {
      this.setState({ error: "Please enter a city name to search", data: [] });
      return;
    }

    this.setState({
      data: [],
      loading: true,
      error: null,
    });

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

    Axios.get(endPoint + new URLSearchParams(params))
      .then((response) => {
        console.log(response);
        const venues = response.data.response.groups[0] && response.data.response.groups[0].items ? response.data.response.groups[0].items : [];
        this.setState({
          data: venues,
          loading: false,
          error: venues.length === 0 ? `No places found in ${query}. Try another city!` : null
        });
      })
      .catch((error) => {
        console.log("API error:", error);
        this.setState({
          loading: false,
          error: "Unable to fetch places. Please check your connection and try again.",
          data: []
        });
      });
  };

  // add an update state function
  updateQuery = (query) => {
    this.setState({ query: query });
  };

  clearQuery = () => {
    this.setState({ query: "", data: [], error: null });
  };

  render() {
    // filter function
    const { data } = this.state;
      // determine which places to show without mutating state directly
      let showingPlaces = this.state.locations.slice();
      if (this.state.query) {
        const match = new RegExp(escapeRegExp(this.state.query), "i");
        showingPlaces = showingPlaces.filter((place) => match.test(place.name));
      }
      showingPlaces.sort(sortBy("name"));

    return (
      <View style={styles.app}>
        <View style={styles.header}>
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
                showingPlaces={showingPlaces}
              filterQuery={this.filterQuery}
              getFsquareData={this.getFsquareData}
              data={data}
              loading={this.state.loading}
              error={this.state.error}
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
                showingPlaces={showingPlaces}
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
    width: "100%",
    alignItems: "center",
    background: "linear-gradient(135deg, #006847 0%, #004D3D 100%)",
  },

  main: {
    flex: 1,
    flexDirection: "row",
  },

  menu: {
    flex: 4,
    background: "linear-gradient(180deg, #004D3D 0%, #006847 100%)",
    overflow: "auto",
    height: "100%",
    scrollbarWidth: 'none',
    borderRight: "1px solid rgba(245, 166, 35, 0.2)",
  },

  mapcontainer: {
    flex: 6,
    backgroundColor: "#F5F2E8",
    boxShadow: "-8px 0 32px rgba(0, 104, 71, 0.15)",
  },

  footer: {
    padding: "20px",
    background: "linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%)",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.85em",
    borderTop: "2px solid #F5A623",
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
