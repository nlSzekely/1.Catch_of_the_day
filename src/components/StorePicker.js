import React,{useRef} from 'react';
import {getFunName} from "../helpers";

export default function StorePicker(props) {
    const storeName = useRef();
    function goToStore(e){
        e.preventDefault();
        props.history.push(`store/${storeName.current.value}`);
    }
    return (
        <form onSubmit={goToStore} className="store-selector">
            <h2>Please Enter A Store</h2>
            <input ref={storeName} type="text" defaultValue={getFunName()} required placeholder="Store Name" />
            <button type="submit">Visit Store</button>
        </form>
    )
}
