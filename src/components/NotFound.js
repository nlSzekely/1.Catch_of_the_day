import React from 'react'

export default function NotFound(props) {
    return (
        <div style={{textAlign:"center"}}>
            <h3>Not Found</h3>
            <button onClick={()=>{props.history.push("/")}}>Back to home</button>
        </div>
    )
}
