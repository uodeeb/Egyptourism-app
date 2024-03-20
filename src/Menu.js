import React from "react";
import { StyleSheet, View } from "react-native";

class Menu extends React.Component {
  render() {
    // put state and props into variables
    const { updateQuery } = this.props;
    let { showingPlaces, data } = this.props;

    return (
      <View className="menu-bar" style={styles.bar}>
        <h3 style={{ color: "#fff" }}>Find Delicious Food Around..</h3>
        <div
          title="places navigation menu"
          aria-label="city list"
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            maxHeight: 40,
          }}
        >
          <input
            className="search-locations"
            tabIndex="0"
            type="search"
            aria-label="search text"
            placeholder="Search a Place"
            value={this.props.query}
            onChange={(event) => updateQuery(event.target.value)}
            style={{
              lineHeight: 1.5,
              borderRadius: 5,
              flex: 4,
              marginRight: 10,
              maxHeight: 30,
            }}
          />
          <button
            id="myBtn"
            tabIndex="0"
            aria-pressed="false"
            onClick={this.props.getFsquareData.bind(null, this.props.query)}
            style={{
              lineHeight: 1.5,
              borderRadius: 7,
              backgroundColor: "#1c262f",
              color: "#fff",
              flex: 2,
              marginRight: 10,
              maxHeight: 30,
            }}
            onKeyUp={(event) => {
              this.props.getFsquareData.bind(null, this.props.query);
            }}
          >
            Find
          </button>
        </div>
        <ul
          className="places-list"
          style={{ color: "#f2a739", listStyleType: "none" }}
          role="listbox"
          key="place"
        >
          {showingPlaces.map((place) => (
            <li
              key={place.referralId}
              tabIndex="0"
              style={{
                fontSize: "1.35em",
                lineHeight: 1.3,
                padding: 5,
                cursor: "pointer",
              }}
              className={this.addAnimation ? "place" : "animated shake"}
              onClick={() => {
                updateQuery(place.name);
                this.props.getFsquareData(place.name); // Trigger data fetch with new query
              }}
              aria-selected="false"
              onMouseEnter={() => this.addAnimation}
              onMouseLeave={() => this.addAnimation}
              role="option"
            >
              {place.name}
            </li>
          ))}
        </ul>
        <ul>
          {(data && data.length > 0) ? (
          data.map((venue) => {
            return (
              <li
                key={venue.venue.referralId}
                className="clicked-place"
                style={{
                  fontSize: "0.8em",
                  border: "1px solid rgb(189,189,189, 0.3)",
                  borderRadius: 5,
                  marginBottom: 5,
                  listStyleType: "none",
                  padding: 10,
                }}
                role="option"
                aria-selected="false"
              >
                <div
                  style={{
                    COLOR: "#f2a739",
                    textAlign: "center",
                  }}
                >
                  <h3 tabIndex="3"> {venue.venue.name}</h3>
                  <h4 tabIndex="3">Territory: {venue.venue.location.city}</h4>
                </div>
                <hr
                  style={{
                    border: "0.2px solid rgb(189,189,189, 0.3)",
                    boxShadow: "0 0 1px 1px rgba(158, 157, 177, 0.1)",
                  }}
                />
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <li
                    key={venue.venue.referralId}
                    style={{ display: "block", color: "#fff", flex: 2 }}
                    role="menuitem"
                  >
                    <img
                      src={
                        venue.photo
                          ? venue.photo.prefix + "100x100" + venue.photo.suffix
                          : require("./images/logo.png")
                      }
                      style={{ borderRadius: 10, height: 100, width: 100 }}
                      alt={venue.name || "Venue Image"} // Add descriptive alt text
                    />
                  </li>
                  <li style={{ flex: 4 }}>
                    <li
                      key={venue.venue.referralId}
                      style={{ display: "block", color: "#fff" }}
                      role="menuitem"
                    >
                      Address: {venue.venue.location.formattedAddress[0]}
                    </li>
                    <li
                      key={venue.venue.referralId}
                      style={{ display: "block", color: "#fff" }}
                      role="menuitem"
                    >
                      Category: {venue.venue.categories[0].name}
                    </li>
                  </li>
                </li>
              </li>
            );
          })) : (
            <li>Loading venues...</li> // Or a placeholder message
          )}
          
        </ul>
      </View>
    );
  }
}
// add some stylesheet props
const styles = StyleSheet.create({
  bar: {
    margin: "auto",
    padding: 5,
  },
});

export default Menu;
