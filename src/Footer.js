import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div>
              <p style={{color: '#fff',  }}
              >Copyrights reserved 2024@ Egyptourism App</p>
               <p style={{ color: "#fff", fontSize: "0.7em"  }}>
                  This data is generated from{" "}
                  <a
                    tabIndex="-1"
                    style={{ color: "#fff", }}
                    href="https://foursquare.com/"
                  >
                    FourSquare
                  </a>{" "}
                  API in realtime
                </p>
      </div>   
    );
  }
}
export default Footer;
