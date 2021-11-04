import React, { Component } from 'react';

const EditorComp = () => {
  return (
    <div>
      <div className="w-70" style={{
          backgroundColor: "#121212",
          borderRadius: "5px",
          border: "2px solid white",
          marginLeft: "15%"
        }}
      >
        <div className='tl pa6 br3' style={{display: "inline"}}>
          <button className='pa2 br3 grow' style={{ margin: "5px" }}>➕</button>
          <button className='pa2 br3 grow' style={{ margin: "5px" }}>📁</button>
          <button className='pa2 br3 grow' style={{ margin: "5px" }}>💾</button>
          <button className='pa2 br3 grow' style={{ margin: "5px" }}>▶</button>
        </div>
        <div className='form tr pa5 br3' style={{display: "inline"}}>
          <input className='pa2 w-25 center' placeholder="Enter collab invite code" type="tex"></input>
          <button className='pa2 br3 grow' style={{ margin: "5px" }}>GO</button>
        </div>
      </div>
      <div style={{paddingTop: "20px"}}>
        <textarea className='form pa5 br3 w-70 h-100 shadow-5'  style={{height: "400px"}}></textarea>
      </div>
    </div>
  );
}

export default EditorComp;
