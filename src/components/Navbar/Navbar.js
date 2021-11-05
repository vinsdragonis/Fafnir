import React, { Component } from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav style={{display: "flex", justifyContent: "space-between"}}>
      <div className="tr" style={{display: "flex", justifyContent: "space-between", paddingLeft: "40px"}}>
        <p className="f4 black link dim underline-hover pa2 br3 pointer" style={{paddingLeft: "20px"}}>About us</p>
        <p className="f4 black link dim underline-hover pa2 br3 pointer" style={{paddingLeft: "20px"}}>Portfolio</p>
        <p className="f4 black link dim underline-hover pa2 br3 pointer" style={{paddingLeft: "20px"}}>Contact</p>
      </div>
    </nav>
  );
}

export default Navbar;
