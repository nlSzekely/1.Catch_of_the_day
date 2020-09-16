import React,{useState} from 'react';
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";


function App() {
  const [fishes,setFishes] = useState({});
  const [order,setOrder] = useState({});

  function addFish(fish){
    const fishesCopy = {...fishes};
    fishesCopy[`fish-${Date.now()}`] = fish;
    console.log(fishesCopy)
    setFishes(fishesCopy);
  }

  return (
    <div className="catch-of-the-day" >
      <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
      </div>
      <Order/>
      <Inventory addFish={addFish} />
    </div>
  );
}

export default App;
