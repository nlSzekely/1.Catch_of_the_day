import React from 'react';
import AddFishForm from "./FishForm";
import EditFishForm from "./EditFishForm";

export default function Inventory(props) {
    if(props.loading){
        return(
        <div>
            <h2>Inventory</h2>
            <p style={{textAlign:"center"}} >Loading...</p>
        </div>
        )
    }
    if(Object.keys(props.fishes).length){
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(props.fishes).map((key)=>{
                    return <EditFishForm editFish={props.editFish} key={key} deleteFish={props.deleteFish} fishId={key} fish={props.fishes[key]} />
                })}
                <AddFishForm addFish={props.addFish}/>
            </div>
        )
    }else{
        return (
            <div>
                <h2>Inventory</h2>
                <button onClick={props.loadSampleFishes} >Load Sample Fishes</button>
            </div>
        )
    }
    
}
