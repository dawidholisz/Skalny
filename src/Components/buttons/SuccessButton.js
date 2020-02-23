import React from 'react'
import MainButton from './index'

const SuccessButton = ({ onClick, text }) => (
  <MainButton className="-success" onClick={onClick} text={text} />
)

export default SuccessButton
