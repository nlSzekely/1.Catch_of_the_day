import React from 'react';
import { formatPrice } from "../helpers";

export default function Order(props) {
    // reduce total
    const total = Object.keys(props.orders).reduce((total, key) => {
        if (props.fishes[key] && props.fishes[key].status === "1") {
            return total + props.orders[key] * props.fishes[key].price;
        }
        return total;
    }, 0);

    const renderOrderList = () => {
        return Object.keys(props.orders).map((key, index) => {
            if (props.fishes[key] && props.fishes[key].status === "0") {
                return <li key={key}>Sorry {props.fishes[key].name} is currently unavailable</li>
            }
            if (!props.fishes[key]) {
                return <li key={index}>No such fish in our database</li>
            }
            return <li key={key}>
                <span>{props.orders[key]}kg{props.fishes[key].name}</span>
                <span className="price">{formatPrice(props.orders[key] * props.fishes[key].price)}</span>
            </li>
        })
    }

    return (
        <div className="order-wrap">
            <h2>Your Order</h2>
            <ul className="order-wrap">

                <ul className="order">
                    {renderOrderList()}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>

            </ul>

        </div>
    )
}
