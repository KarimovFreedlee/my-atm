import React from 'react'

export default function Form({handleSubmit, handleChange, value, textInput}) {
    return (
        <form onSubmit ={handleSubmit}>
            <input value = {value}  ref={textInput} placeholder = 'сумма' onChange = {handleChange}/>
            <input type="submit" value="Выдача" />
      </form>
    )
}
