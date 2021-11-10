import React from 'react'

export default function Outputs({value, obj}) {
    return (
        <div className = 'elem'>
            {value}
            <input className = 'amountOuput' readOnly = {true} value ={obj}/>
        </div>
    )
}
