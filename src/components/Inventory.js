import React from 'react';
import AddFishForm from "./FishForm";

export default function Inventory(props) {
    return (
        <div>
            <h2>Inventory</h2>
            <AddFishForm addFish={props.addFish}/>
        </div>
    )
}
