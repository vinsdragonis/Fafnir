import React, { Component } from 'react';
import dragon from'./Logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <div className="link pa1 pointer grow" style={{ display: "flex", justifyContent: "space-between", marginTop: "7px" }}>
        <img src={ dragon } style={{ height: "60px" }} alt="Logo" />
      </div>
    </div>
  );
}

export default Logo;
