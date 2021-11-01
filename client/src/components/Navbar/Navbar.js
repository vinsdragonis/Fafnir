import React, { Component } from 'react';

const Navbar = () => {
  return (
    <nav style={{display: "flex", justifyContent: "space-between"}}>
      <h1 className="f3 black link dim pa1 pointer">Fafnir</h1>
      <div className="tr" style={{display: "flex", justifyContent: "space-between", paddingLeft: "50px"}}>
        <p className="f4 black link dim underline-hover pa1 br3 pointer" style={{paddingLeft: "20px"}}>About us</p>
        <p className="f4 black link dim underline-hover pa1 br3 pointer" style={{paddingLeft: "20px"}}>Portfolio</p>
        <p className="f4 black link dim underline-hover pa1 br3 pointer" style={{paddingLeft: "20px"}}>Contact</p>
      </div>
    </nav>
  );
}

export default Navbar;
