import React from 'react';
import { formatPrice } from "../helpers";

export default function Fish(props) {
    return (
        <li className="menu-fish">
            <img src={props.fishObj.image} alt={props.fishObj.name} />
            <h3 className="fish-name">
                {props.fishObj.name}
                <span className="price">{formatPrice(props.fishObj.price)}</span>
            </h3>
            <p>{props.fishObj.desc}</p>
            <button onClick={()=>props.addToOrder(props.fishId)} disabled={props.fishObj.status === "1"?false:true}  >{props.fishObj.status === "1"?"Add to order":"Sold out"}</button>
        </li>
    )
}
