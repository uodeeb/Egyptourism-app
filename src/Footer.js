import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div style={{
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 8,
        }}>
          <div style={{
            width: 40,
            height: 2,
            background: "linear-gradient(90deg, transparent, #F5A623, transparent)",
          }} />
          <span style={{
            fontSize: "1.2rem",
            color: "#F5A623",
          }}>☥</span>
          <div style={{
            width: 40,
            height: 2,
            background: "linear-gradient(90deg, transparent, #F5A623, transparent)",
          }} />
        </div>

        <p style={{
          color: '#F5F2E8',
          margin: "0 0 8px 0",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}>
          © 2018-2025 Egyptourism App
        </p>

        <p style={{
          color: "#8B8B7A",
          fontSize: "0.8rem",
          margin: 0,
          lineHeight: 1.5,
        }}>
          Powered by{" "}
          <a
            tabIndex="-1"
            style={{
              color: "#F5A623",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
            href="https://foursquare.com/"
            onMouseEnter={(e) => e.target.style.color = "#D4774E"}
            onMouseLeave={(e) => e.target.style.color = "#F5A623"}
          >
            Foursquare
          </a>
          {" "}API
        </p>
      </div>
    );
  }
}
export default Footer;
