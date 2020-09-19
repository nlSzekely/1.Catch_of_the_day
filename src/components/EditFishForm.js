import React from 'react'

export default function EditFishForm() {
    return (
        <div>
            <div  className="fish-edit" key="key">
                <input type="text" name="name" placeholder="Fish name" />
                <input type="text" name="price" placeholder="Fish price" />
                <select>
                    <option value="1">Fresh!</option>
                    <option value="2">Sold out!</option>
                </select>
                <textarea name="desc" placeholder="Description"></textarea>
                <input type="text" placeholder="Fish Image"/>
            </div>
        </div>
    )
}
