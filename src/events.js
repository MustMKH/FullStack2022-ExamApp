import React, { useState } from 'react';

function Event() {
    const [tila, setTila] = useState(true) // false = alkuarvo
    console.log("tila", tila)
    return (
        <div>
{/*             <button onClick={()=>{
                console.log("Painoit muuten nappulaa")
            }}/>
            <input type="text" onChange={(event)=>{
                console.log("tekstikentässä lukee", event.target.value)
            }}/> */}
            <input type="checkbox" checked={tila} onChange={(event)=>{
                console.log("checkboxin uusi tila on:", event.target.checked)
                setTila (event.target.checked)
            }}/>
        </div>
    )
};

export default Event