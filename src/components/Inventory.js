import React from 'react';
import AddFishForm from "./FishForm";
import EditFishForm from "./EditFishForm";

export default function Inventory(props) {
    function renderInventory() {
        if (props.loading || props.userLoading) {
            return (
                <p style={{ textAlign: "center" }} >Loading...</p>
            )
        } else {
            if (props.userId) {
                // OWNERSHIP CHECK HERE
                if (props.owner) {
                    if (props.userId === props.owner) {
                        if (Object.keys(props.fishes).length) {
                            return (
                                <React.Fragment>
                                    <button style={{ marginBottom: "10px" }} onClick={props.logout}>Log out!</button>
                                    {Object.keys(props.fishes).map((key) => {
                                        return <EditFishForm editFish={props.editFish} key={key} deleteFish={props.deleteFish} fishId={key} fish={props.fishes[key]} />
                                    })}
                                    <AddFishForm addFish={props.addFish} />
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <button style={{ marginBottom: "10px" }} onClick={props.logout}>Log out!</button>
                                    <button onClick={props.loadSampleFishes} >Load Sample Fishes</button>
                                </React.Fragment>
                            )
                        }
                    } else {
                        return (
                            <React.Fragment>
                                <button style={{ marginBottom: "10px" }} onClick={props.logout}>Log out!</button>
                                <p>This store is owned by someone else try another </p>
                            </React.Fragment>

                        )
                    }
                } else {
                    return (
                        <React.Fragment>
                            <button style={{ marginBottom: "10px" }} onClick={props.logout}>Log out!</button>
                            <p>This store is free to use</p>
                            <button onClick={props.claimStore}>Claim Store</button>
                        </React.Fragment>

                    )
                }


            } else {
                // no user
                return (
                    <nav className="login">
                        <p>Sign in to manage you store's inventory</p>
                        <button className="github" onClick={() => props.authenticate("github")}>{props.loginLoading ? "Loading" : "Log in with Github"}</button>
                        <button className="facebook" onClick={() => props.authenticate("facebook")}>{props.loginLoading ? "Loading" : "Log in with Facebook"}</button>
                        <div>{props.loginError}</div>
                    </nav>
                );
            }
        }
    }
    return (
        <div>
            <h2>Inventory</h2>
            {renderInventory()}
        </div>
    )
}
