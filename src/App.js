import React from 'react';
// import StorePicker from "./components/StorePicker";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";

function App() {
  return (
    <div className="catch-of-the-day" >
      <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
      </div>
      <Order/>
      <Inventory/>
    </div>
  );
}

export default App;
