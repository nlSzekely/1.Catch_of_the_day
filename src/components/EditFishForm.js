import React from 'react'

export default function EditFishForm(props) {
    
    return (
        <div>
            <div  className="fish-edit">
                <input value={props.fish.name} type="text" name="name" placeholder="Fish name" />
                <input value={props.fish.price} type="text" name="price" placeholder="Fish price" />
                <select value={props.fish.status}>
                    <option value="1">Fresh!</option>
                    <option value="0">Sold out!</option>
                </select>
                <textarea value={props.fish.desc} name="desc" placeholder="Description"></textarea>
                <input value={props.fish.image} type="text" placeholder="Fish Image"/>
                <button onClick={()=>{props.deleteFish(props.fishId)}}> - Remove Item</button>
            </div>
        </div>
    )
}
