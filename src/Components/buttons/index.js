import React from 'react'

const MainButton = ({ onClick, text, className }) =>
 <button className={`btn ${className}`} onClick={onClick}>{text}</button>


export default MainButton
