import React from 'react'

export default function StorePicker() {
    return (
        <form className="store-picker">
            <h2>Please Enter A Stor</h2>
            <input type="text" required placeholder="Store Name" />
            <button type="submit">Visit Store</button>
        </form>
    )
}
