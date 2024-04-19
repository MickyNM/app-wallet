import React, { useState, useRef } from 'react';
import './ArrowComponent.css';

const ArrowComponent = () => {
  const contentHeight = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="topnav">
      <div ref={contentHeight}
        className="menu-container"
        style={
          showMenu
            ? { height: "1450px" }
            : { height: "0px" }
        }
      >
        <div id="menu" className="menu">
          <h1>Buy your first Bitcoin today</h1><br />
          <text>Buy, sell, trade, and invest in Bitcoin & crypto - all in one safe and simple app...</text>
          <img className='buy' src="images/sell.jpg" width={350} alt="sell" onClick={() => window.location.href = '#'} /><p>Sell BTC</p>
          <img className='sell' src="images/buy.jpg" width={350} alt="buy" onClick={() => window.location.href = '#'} /><p>Buy BTC</p>
        </div>
      </div>
      <div className="arrow">
        <img id="arrow" src="images/arrow-down.jpg" className={`arrow ${showMenu ? "active" : ""}`} alt="dropdown arrow" onClick={toggleMenu} />
      </div>
    </div>
  );
}

export default ArrowComponent;
