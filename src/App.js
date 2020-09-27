import React, { useState } from 'react';
import { useEffect } from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import Fish from "./components/Fish";
import sampleFishes from "./sample-fishes";

// ----------------Firebase Import----------------------
import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";

function Loading() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h4>Loading.....</h4>
    </div>
  )
}



function App(props) {
  const storeId = props.match.params.storeId;
  const [loading, setLoading] = useState(true);
  const [database, setDatabase] = useState();
  const [fishes, setFishes] = useState({});
  const [orders, setOrders] = useState(getOrder());
  const [userId, setUserId] = useState(null);
  const [userLoading,setUserLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [loginLoading,setLoginLoading] = useState(false);
  const [loginError,setLoginError] = useState("");
  // getting the database from firebase -----------------------------------------------
  useEffect(() => {
    function getDatabase() {
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
        // ----AuthStateChange listener------------
        // https://firebase.google.com/docs/auth/web/manage-users - gets invoked after  every login and logout
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            setUserId(user.uid);
            setUserLoading(false);
          } else {
            // No user is signed in.
            setUserId(null);
            setUserLoading(false);

          }
        });
      }
      const database = firebase.database().ref(`/catch-of-the-day/${storeId}`);
      setDatabase(database);
    };
    getDatabase();
  }, [storeId]);
  // loading the fishes from the database---------------------------------------------------refreshes state when database changes
  useEffect(() => {
    if (!database) { return };
    database.child("fishes").on("value", (item) => {
      setFishes(item.val() || {});
      setLoading(false);
    })
    database.child("owner").on("value",(item)=>{
      setOwner(item.val()||null)
    })
  }, [database])
  // add fish to the database---------------------------------------------------------------
  function addFish(fish) {
    database.child("fishes").child(`fish-${Date.now()}`).set(fish)
  }
  // delete fish from the database-----------------------------------------------------------
  function deleteFish(id) {
    database.child("fishes").child(id).remove()
  }
  // edit fish-------------------------------------------------------------------------------
  function editFish(id, prop, value) {
    database.child("fishes").child(id).child(prop).set(value)
  }
  // claim ownership-------------------------------------------------------------------------
  function claimStore(){
    database.child("owner").set(userId);
    setOwner(userId);
  }


  // -----------------------------------------------------------------ORDER----------------------------------------------------------------

  // getting the order from local storage-----------------------------------
  function getOrder() {
    const storeId = props.match.params.storeId;
    const order = JSON.parse(localStorage.getItem(storeId)) || {};
    return order;
  }
  // saving the order when order is changed---------------------------------
  useEffect(() => {
    function saveOrders(storeId) {
      localStorage.setItem(storeId, JSON.stringify(orders))
    }
    saveOrders(storeId)
  }, [orders, storeId]);
  // add to order------------------------------------------------------------
  function addToOrder(id) {
    const ordersCopy = { ...orders };
    ordersCopy[id] = ordersCopy[id] + 1 || 1;
    setOrders(ordersCopy);
  }
  // remove from order-------------------------------------------------------
  function removeOrder(fishId) {
    const updatedOrders = { ...orders };
    delete updatedOrders[fishId];
    setOrders(updatedOrders);
  }

  function loadSampleFishes() {
    database.child("fishes").set(sampleFishes);
  }
  //--------------------------------------------------------------AUTHENTICATE-------------------------------------------------
  function authenticate(method) {
    setLoginLoading(true);
    setLoginError("");
    let provider;
    switch (method) {
      case "github":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case "facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      default :
        return null;
    }
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setLoading(false);
      setUserId(user.uid);
      setLoginLoading(false);
      console.log(user);
      // ...
    }).catch(function (error) {
      setLoginLoading(false)
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      console.log(error);
      setLoginError(error.message);
      // ...
    });
  }
  // ----Logout------------
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUserId(null);
      })
      .catch(function (error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
        console.log(errorCode);
      });
  }




  return (
    <div className="catch-of-the-day" >
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        {/* list of fishes-------- */}
        {loading ? <Loading /> :
          <ul className="list-of-fishes">
            {Object.keys(fishes).map((key) => {
              return <Fish key={key} addToOrder={addToOrder} fishId={key} fishObj={fishes[key]} />
            })}
          </ul>}

      </div>

      {/* order----------------- */}
      <Order removeOrder={removeOrder} loading={loading} fishes={fishes} orders={orders} />
      {/* inventory------------- */}
      <Inventory 
        claimStore={claimStore} 
        owner={owner} 
        authenticate={authenticate} 
        logout={logout} 
        loading={loading} 
        userId={userId} 
        loadSampleFishes={loadSampleFishes} 
        userLoading={userLoading} fishes={fishes} 
        editFish={editFish} 
        deleteFish={deleteFish} 
        addFish={addFish} 
        loginLoading={loginLoading}
        loginError = {loginError}
        />
        
    </div>
  );
}

export default App;
