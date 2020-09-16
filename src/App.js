import React, { useState } from 'react';
import {useEffect} from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import Fish from "./components/Fish";
import sampleFishes from "./sample-fishes"


function App() {
  const [fishes, setFishes] = useState({});
  const [orders, setOrders] = useState({});
  useEffect(()=>{
    console.log(orders)
  },[fishes,orders])

  function loadSampleFishes() {
    setFishes(sampleFishes);
  }

  function addFish(fish) {
    const fishesCopy = { ...fishes };
    fishesCopy[`fish-${Date.now()}`] = fish;
    console.log(fishesCopy)
    setFishes(fishesCopy);
  }
  function addToOrder(id){
    const ordersCopy = {...orders};
    ordersCopy[id] = ordersCopy[id]+1 || 1;
    setOrders(ordersCopy);
  }

  return (
    <div className="catch-of-the-day" >
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        {/* list of fishes-------- */}
        <ul className="list-of-fishes">
          {Object.keys(fishes).map((key) => {
            return <Fish key={key} addToOrder={addToOrder} fishId={key} fishObj={fishes[key]} />
          })}
        </ul>
      </div>

      {/* order----------------- */}
      <Order />
      {/* inventory------------- */}
      <Inventory loadSampleFishes={loadSampleFishes} addFish={addFish} />
    </div>
  );
}

export default App;
