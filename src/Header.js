import React from "react";


class Header extends React.Component {
  render() {
    return (
     
      <div className="container" 
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
         >
          <img src={require('./images/logo.png')} alt="logo" className="logo" height='120px' width='80px'/>

      </div>    
    );
  }
}

export default Header;
