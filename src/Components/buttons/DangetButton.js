import React from 'react'
import MainButton from './index'

const DangerButton = ({ onClick, text }) => (
  <MainButton className="-danger" onClick={onClick} text={text} />
)

export default DangerButton
