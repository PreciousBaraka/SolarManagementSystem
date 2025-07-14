import React from 'react'
import "./avatar.css"
import avatarImage from "../../assets/images/avatarimg.jpg"

function Avatar() {
  return (
    <div className='avatar-container'>
      <img src={avatarImage} alt="Avatar Image" />
      <div className='avatar-badge'></div>
    </div>
  )
}

export default Avatar
