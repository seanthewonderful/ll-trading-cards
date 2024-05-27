import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    axios.post('/api/logout')
    .then(res => {
      dispatch({ type: "SET_USER", payload: null })
      dispatch({ type: "SET_ADMIN", payload: null })
      console.log(res.data)
      navigate('/')
    })
    .catch(err => console.warn("UNEXPECTED LOGOUT ERROR: ", err))
  }

  return (
    <nav id='navbar'>

      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      <NavLink to="/dugout">
        <button>Dugout</button>
      </NavLink>

      <NavLink to="/profile">
        <button>Profile</button>
      </NavLink>
      
      <NavLink onClick={logout}>
        <button>Logout</button>
      </NavLink>
      
    </nav>
  )
}

export default Navbar