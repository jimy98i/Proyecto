import React from 'react'

export const Button = ({text = "Click Me", onClick = () => alert("No funcion")}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
