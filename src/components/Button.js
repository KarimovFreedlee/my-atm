import React from 'react'

export default function Button({classname, value, onClick}) {
    return (
        <button classname = {classname} onClick = {onClick}>
            {value}
        </button>
    )
}
