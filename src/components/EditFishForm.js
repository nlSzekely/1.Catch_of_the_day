import React from 'react';


export default function EditFishForm(props) {
    
    return (
        <div>
            <div className="fish-edit">
                <input onChange={(e)=>{props.editFish(props.fishId,e.target.name,e.target.value)}} value={props.fish.name} type="text" name="name" placeholder="Fish name" />
                <input  onChange={(e)=>{props.editFish(props.fishId,e.target.name,e.target.value)}} value={props.fish.price} type="number" name="price" placeholder="Fish price" />
                <select onChange={(e)=>{props.editFish(props.fishId,e.target.name,e.target.value)}} value={props.fish.status} name="status">
                    <option value="1">Fresh!</option>
                    <option value="0">Sold out!</option>
                </select>
                <textarea onChange={(e)=>{props.editFish(props.fishId,e.target.name,e.target.value)}} value={props.fish.desc} name="desc" placeholder="Description"></textarea>
                <input onChange={(e)=>{props.editFish(props.fishId,e.target.name,e.target.value)}} value={props.fish.image} type="text" name="image" placeholder="Fish Image" />
                <button onClick={()=>{props.deleteFish(props.fishId)}} > - Remove Item</button>
            </div>
        </div>
    )
}
