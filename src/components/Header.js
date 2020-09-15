import React from 'react'

export default function Header(props) {
    console.log(this)
    return (
        <header className="top">
            <h1>
                Catch 
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                day</h1>
            <h3 className="tagline">{props.tagline}</h3>
        </header>
    )
}