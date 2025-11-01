import React from "react";
import { StyleSheet, View } from "react-native";

class Menu extends React.Component {
  state = {
    hoveredPlace: null,
    hoveredVenue: null,
  };

  generateNavigationUrl = (lat, lng, name) => {
    const encodedName = encodeURIComponent(name);
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      return `maps://maps.apple.com/?q=${encodedName}`;
    } else if (/Android/.test(navigator.userAgent)) {
      return `geo:0,0?q=${encodedName}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodedName}`;
  }

  render() {
    const { updateQuery, loading, error } = this.props;
    let { showingPlaces, data } = this.props;

    return (
      <View className="menu-bar" style={styles.bar}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid rgba(245, 166, 35, 0.2)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h3 style={{
              color: "#F5A623",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              margin: 0,
              fontWeight: 700,
            }}>
              Discover Egypt
            </h3>
            {(this.props.query || (data && data.length > 0)) && (
              <button
                onClick={() => {
                  this.props.clearQuery();
                  this.setState({ hoveredPlace: null, hoveredVenue: null });
                }}
                style={{
                  padding: "8px 16px",
                  background: "rgba(245, 166, 35, 0.2)",
                  border: "1px solid #F5A623",
                  borderRadius: 6,
                  color: "#F5A623",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(245, 166, 35, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(245, 166, 35, 0.2)";
                }}
              >
                Reset
              </button>
            )}
          </div>
          <p style={{
            color: "#F5F2E8",
            fontSize: "0.85rem",
            margin: 0,
            opacity: 0.9,
          }}>
            Explore places and navigate with ease
          </p>
        </div>

        <div
          title="places navigation menu"
          aria-label="city list"
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          <input
            className="search-locations"
            tabIndex="0"
            type="search"
            aria-label="search text"
            placeholder="Search a city..."
            value={this.props.query}
            onChange={(event) => updateQuery(event.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              border: "2px solid rgba(245, 166, 35, 0.3)",
              background: "rgba(245, 242, 232, 0.1)",
              color: "#F5F2E8",
              fontSize: "0.95rem",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.border = "2px solid #F5A623";
              e.target.style.background = "rgba(245, 242, 232, 0.15)";
              e.target.style.boxShadow = "0 0 0 4px rgba(245, 166, 35, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.border = "2px solid rgba(245, 166, 35, 0.3)";
              e.target.style.background = "rgba(245, 242, 232, 0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            id="myBtn"
            className="btn-primary"
            tabIndex="0"
            aria-pressed="false"
            onClick={this.props.getFsquareData.bind(null, this.props.query)}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #F5A623 0%, #D4774E 100%)",
              color: "#2C2C2C",
              border: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(245, 166, 35, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
            onKeyUp={(event) => {
              this.props.getFsquareData.bind(null, this.props.query);
            }}
          >
            Find Places
          </button>
        </div>
        <div style={{ padding: "0 20px 20px 20px" }}>
          <h4 style={{
            color: "#F5A623",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            Egyptian Cities
          </h4>
          <ul
            className="places-list"
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
            role="listbox"
            key="place"
          >
            {showingPlaces.map((place) => (
              <li
                key={place.referralId}
                tabIndex="0"
                style={{
                  padding: "12px 16px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  borderRadius: 8,
                  background: this.state.hoveredPlace === place.id
                    ? "rgba(245, 166, 35, 0.15)"
                    : "rgba(245, 242, 232, 0.05)",
                  border: `1px solid ${this.state.hoveredPlace === place.id ? "#F5A623" : "rgba(245, 166, 35, 0.2)"}`,
                  color: this.state.hoveredPlace === place.id ? "#F5A623" : "#F5F2E8",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  transform: this.state.hoveredPlace === place.id ? "translateX(4px)" : "translateX(0)",
                }}
                onClick={() => {
                  updateQuery(place.name);
                  this.props.getFsquareData(place.name);
                }}
                aria-selected="false"
                onMouseEnter={() => this.setState({ hoveredPlace: place.id })}
                onMouseLeave={() => this.setState({ hoveredPlace: null })}
                role="option"
              >
                {place.name}
              </li>
            ))}
          </ul>
        </div>
        {loading && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              width: "50px",
              height: "50px",
              border: "4px solid rgba(245, 166, 35, 0.3)",
              borderTop: "4px solid #F5A623",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <p style={{
              color: "#F5F2E8",
              marginTop: "12px",
              fontSize: "0.9rem",
            }}>
              Finding amazing places...
            </p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}
        {error && !loading && (
          <div style={{
            padding: "20px",
            margin: "0 20px 20px 20px",
            background: "rgba(212, 119, 78, 0.15)",
            border: "1px solid rgba(212, 119, 78, 0.4)",
            borderRadius: 8,
            color: "#F5F2E8",
            fontSize: "0.9rem",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}
        {(data && data.length > 0 && !loading) && (
          <div style={{ padding: "0 20px 20px 20px" }}>
            <h4 style={{
              color: "#F5A623",
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              Found Places
            </h4>
            <ul style={{ padding: 0, margin: 0 }}>
              {data.map((venue) => {
                return (
                  <li
                    key={venue.venue.referralId}
                    className="card-elevated"
                    style={{
                      fontSize: "0.85em",
                      border: this.state.hoveredVenue === venue.venue.id ? "1px solid #F5A623" : "1px solid rgba(245, 166, 35, 0.2)",
                      borderRadius: 12,
                      marginBottom: 16,
                      listStyleType: "none",
                      padding: 16,
                      background: this.state.hoveredVenue === venue.venue.id ? "rgba(245, 166, 35, 0.1)" : "rgba(245, 242, 232, 0.05)",
                      transition: "all 0.3s ease",
                    }}
                    role="option"
                    aria-selected="false"
                    onMouseEnter={() => this.setState({ hoveredVenue: venue.venue.id })}
                    onMouseLeave={() => this.setState({ hoveredVenue: null })}
                  >
                    <div
                      style={{
                        color: "#F5A623",
                        marginBottom: 12,
                      }}
                    >
                      <h3 style={{
                        margin: 0,
                        marginBottom: 4,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        fontFamily: "'Playfair Display', serif",
                      }} tabIndex="3">
                        {venue.venue.name}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: "#F5F2E8",
                        opacity: 0.8,
                      }} tabIndex="3">
                        {venue.venue.location.city}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ flex: "0 0 auto" }}>
                        <img
                          src={
                            venue.photo
                              ? venue.photo.prefix + "100x100" + venue.photo.suffix
                              : require("./images/logo copy.png")
                          }
                          style={{
                            borderRadius: 8,
                            height: 80,
                            width: 80,
                            objectFit: "cover",
                            border: "2px solid rgba(245, 166, 35, 0.3)",
                          }}
                          alt={venue.venue.name || "Venue Image"}
                        />
                      </div>
                      <div style={{ flex: 1, color: "#F5F2E8" }}>
                        <p style={{
                          margin: "0 0 8px 0",
                          fontSize: "0.85rem",
                          lineHeight: 1.4,
                        }}>
                          <strong style={{ color: "#F5A623" }}>Address:</strong><br />
                          {venue.venue.location.formattedAddress[0]}
                        </p>
                        <p style={{
                          margin: "0 0 8px 0",
                          fontSize: "0.85rem",
                        }}>
                          <strong style={{ color: "#F5A623" }}>Category:</strong><br />
                          {venue.venue.categories[0].name}
                        </p>
                        {venue.venue.location.distance && (
                          <p style={{
                            margin: 0,
                            fontSize: "0.85rem",
                          }}>
                            <strong style={{ color: "#F5A623" }}>Distance:</strong><br />
                            {(venue.venue.location.distance / 1000).toFixed(1)} km away
                          </p>
                        )}
                      </div>
                    </div>
                    {venue.venue.location.lat && venue.venue.location.lng && (
                      <a
                        href={this.generateNavigationUrl(
                          venue.venue.location.lat,
                          venue.venue.location.lng,
                          venue.venue.name
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          background: "linear-gradient(135deg, #F5A623 0%, #D4774E 100%)",
                          color: "#2C2C2C",
                          textDecoration: "none",
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 4px 12px rgba(245, 166, 35, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        Navigate to {venue.venue.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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
