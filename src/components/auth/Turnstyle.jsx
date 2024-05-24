import { useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

function Turnstyle({ isOpen, onClose, register, loginClick, registerClick }) {

  if (!isOpen) {
    return null
  }

  return (
    <div className='modal'>
      Tickets, please

      <button onClick={onClose}>Close</button>

      {register ? 
        <Register onClose={onClose} /> 
        : 
        <Login onClose={onClose} />
      }

      <button 
        onClick={register ? loginClick : registerClick}
        >
        {register ? "Login" : "Register"}
      </button>
      
    </div>
  )
}

export default Turnstyle