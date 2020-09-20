import React from 'react';
import AddFishForm from "./FishForm";
import EditFishForm from "./EditFishForm";

export default function Inventory(props) {
 
    return (
        <div>
            <h2>Inventory</h2>
            {Object.keys(props.fishes).map((key)=>{
                return <EditFishForm key={key} deleteFish={props.deleteFish} fishId={key} fish={props.fishes[key]} />
            })}
            <AddFishForm addFish={props.addFish}/>
            <button onClick={props.loadSampleFishes}>Load Sample Fishes</button>
        </div>
    )
}
