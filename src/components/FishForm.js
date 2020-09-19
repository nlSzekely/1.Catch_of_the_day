import React,{useRef} from 'react';


export default function FishForm(props) {
    const fishName = useRef();
    const fishPrice = useRef();
    const fishStatus = useRef();
    const fishDesc = useRef();
    const fishImg = useRef();
    const fishForm = useRef();

    function handleSubmit(e){
        e.preventDefault();
        const fish = {
            name: fishName.current.value,
            price: fishPrice.current.value,
            status: fishStatus.current.value,
            desc: fishDesc.current.value,
            img: fishImg.current.value
        }
        // clear the form fields after submit
        fishForm.current.reset();
        props.addFish(fish);
    }
    return (
        <form ref={fishForm} onSubmit={handleSubmit} className="fish-edit">
            <input ref={fishName} defaultValue={props.fish?props.fish.name:""} type="text" placeholder="Fish Name"/>
            <input ref={fishPrice} type="text" placeholder="Fish Price"/>
            <select ref={fishStatus}>
                <option value="1">Fresh!</option>
                <option value="0">Sold Out!</option>
            </select>
            <textarea ref={fishDesc} placeholder="Description"></textarea>
            <input ref={fishImg} type="text" placeholder="Fish Img"/>
            <button type="submit">+Add Item</button>
        </form>
    )
}
