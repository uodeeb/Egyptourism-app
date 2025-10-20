import React from "react";
import EgyptianPattern from "./EgyptianPattern";

class Header extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 100);
  }

  render() {
    return (
      <div
        className="header-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "20px",
          background: "linear-gradient(135deg, #006847 0%, #004D3D 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <EgyptianPattern opacity={0.08} color="#F5A623" />

        <div
          style={{
            opacity: this.state.isLoaded ? 1 : 0,
            transform: this.state.isLoaded ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.9)",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src={require('./images/logo copy.png')}
            alt="Egyptourism - Find Places To Hang Out In Egypt"
            className="logo"
            style={{
              height: "auto",
              width: "280px",
              maxWidth: "90vw",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>

        <p
          style={{
            color: "#F5F2E8",
            fontSize: "0.95rem",
            fontWeight: 400,
            marginTop: "12px",
            letterSpacing: "0.5px",
            fontFamily: "'Inter', sans-serif",
            opacity: this.state.isLoaded ? 1 : 0,
            transform: this.state.isLoaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Find Places To Hang Out In Egypt
        </p>
      </div>
    );
  }
}

export default Header;
