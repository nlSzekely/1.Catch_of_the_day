import React from 'react';
import {getFunName} from "../helpers";

export default function StorePicker() {
    return (
        <form className="store-selector">
            <h2>Please Enter A Store</h2>
            <input type="text" defaultValue={getFunName()} required placeholder="Store Name" />
            <button type="submit">Visit Store</button>
        </form>
    )
}
