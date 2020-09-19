import React, { useState } from 'react';
import {useEffect} from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import Fish from "./components/Fish";
import sampleFishes from "./sample-fishes"

// ----------------Firebase Import----------------------
import firebase from 'firebase/app';
import 'firebase/database';



function App(props) {
  
  const [database,setDatabase] = useState();
  const [fishes, setFishes] = useState({});
  const [orders, setOrders] = useState(getOrder());
  // component will mount setting the database 
  useEffect(()=>{
    // getting the database from firebase function-----------------------------------
    function getDatabase(){
      var firebaseConfig = {
        apiKey: "AIzaSyC85OTJiMIfODh3EJD8-UGvbn766oit-Ek",
        authDomain: "nlszekely-projects.firebaseapp.com",
        databaseURL: "https://nlszekely-projects.firebaseio.com",
        projectId: "nlszekely-projects",
        storageBucket: "nlszekely-projects.appspot.com",
        messagingSenderId: "951390431995",
        appId: "1:951390431995:web:563d083057e8aee4ecde5e",
        measurementId: "G-EQ7YY8PJPR"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database().ref('/catch_of_the_day');
    setDatabase(database);
  };
    // calling the function
    getDatabase();
  },[]);
  // saving the order when order is changed
  useEffect(()=>{
      // save order function-------------------------------------------
    const storeId = props.match.params.storeId;
    function saveOrders(storeId){
      localStorage.setItem(storeId,JSON.stringify(orders))
    }
    saveOrders(storeId)
  },[orders,props.match.params.storeId]);

  function loadSampleFishes() {
    setFishes(sampleFishes);
  }

  function addFish(fish) {
    const fishesCopy = { ...fishes };
    fishesCopy[`fish-${Date.now()}`] = fish;
    setFishes(fishesCopy);
  }
  function addToOrder(id){
    const ordersCopy = {...orders};
    ordersCopy[id] = ordersCopy[id]+1 || 1;
    setOrders(ordersCopy);
  }
  
  // getting the order from local storage-----------------------------------
  function getOrder(){
    const storeId = props.match.params.storeId;
    const order = JSON.parse(localStorage.getItem(storeId)) || {};
    return order; 
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
      <Order fishes={fishes} orders={orders} />
      {/* inventory------------- */}
      <Inventory loadSampleFishes={loadSampleFishes} addFish={addFish} />
    </div>
  );
}

export default App;
