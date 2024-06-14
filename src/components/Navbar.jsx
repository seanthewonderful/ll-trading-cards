import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)

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

    {user ? (
      <>
      <NavLink 
        to="/myteams"
        className={({ isActive, isPending }) =>
          isPending ? "navlink pending" : isActive ? "navlink active" : "navlink"
        }
        >
          <button>Your Teams</button>
      </NavLink>

      <NavLink 
        to="/dugout"
        className={({ isActive, isPending }) =>
          isPending ? "navlink pending" : isActive ? "navlink active" : "navlink"
        }
        >
          <button>Dugout</button>
      </NavLink>

      <NavLink 
        to="/profile"
        className={({ isActive, isPending }) =>
          isPending ? "navlink pending" : isActive ? "navlink active" : "navlink"
        }
        >
          <button>Profile</button>
      </NavLink>
      
      <NavLink 
        onClick={logout}
        >
          <button>Logout</button>
      </NavLink>
      </>
    ) : (
      <>
        <NavLink 
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "navlink pending" : isActive ? "navlink active" : "navlink"
          }
          >
            <button>Learn More</button>
        </NavLink>
        {/* <NavLink 
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "navlink pending" : isActive ? "navlink active" : "navlink"
          }
          >
            <button>Login</button>
        </NavLink> */}
      </>
    )}
    </nav>
  )
}

export default Navbar