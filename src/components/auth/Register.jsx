import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Register = ({ onClose }) => {

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: false,
    favTeam: "",
  })

  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!registerInfo.confirmPassword) {
      console.log("Passwords do not match")
      return
    }

    const body = {
      email: registerInfo.email,
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      password: registerInfo.password,
      favTeam: registerInfo.favTeam
    }

    await axios.post('/api/register', body)
    .then(res => {
      onClose()
      dispatch({ type: "SET_USER", payload: res.data.user })
    })
    .catch(err => {
      console.warn("REGISTER ERROR: ", err)
    })
  }

  const confirmPassword = (e) => {
    if (registerInfo.password === e.target.value) {
      setRegisterInfo({ ...registerInfo, confirmPassword: true })
    } else {
      setRegisterInfo({ ...registerInfo, confirmPassword: false })
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="email">Email</label>
      <input 
        type="text"
        id="email" 
        name="email" 
        autoFocus
        onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
        />

      <label htmlFor="first-name">First Name</label>
      <input 
        type="text"
        id="first-name" 
        name="first-name" 
        onChange={(e) => setRegisterInfo({ ...registerInfo, firstName: e.target.value })}
        />

      <label htmlFor="last-name">Last Name</label>
      <input 
        type="text"
        id="last-name" 
        name="last-name" 
        onChange={(e) => setRegisterInfo({ ...registerInfo, lastName: e.target.value })}
        />

      <label htmlFor="password">Password</label>
      <input 
        type="password"
        id="password" 
        name="password" 
        onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
        />

      <label htmlFor="confirm-password">Confirm Password</label>
      <input 
        type="password"
        id="confirm-password" 
        name="confirm-password" 
        onChange={confirmPassword}
        />

      <label htmlFor="fav-team">Favorite Team</label>
      <select id="fav-team">
        <option value="MLB">MLB</option>
        <option value="AL">American League</option>
        <option value="NL">National League</option>
        <option value="ARI">Arizona Diamondbacks</option>
        <option value="ATL">Atlanta Braves</option>
        <option value="BAL">Baltimore Orioles</option>
        <option value="BOS">Boston Red Sox</option>
        <option value="CHC">Chicago Cubs</option>
        <option value="CHW">Chicago White Sox</option>
        <option value="CIN">Cincinnati Reds</option>
        <option value="CLE">Cleveland Indians</option>
        <option value="COL">Colorado Rockies</option>
        <option value="DET">Detroit Tigers</option>
        <option value="HOU">Houston Astros</option>
        <option value="KC">Kansas City Royals</option>
        <option value="LAA">Los Angeles Angels</option>
        <option value="LAD">Los Angeles Dodgers</option>
        <option value="MIA">Miami Marlins</option>
        <option value="MIL">Milwaukee Brewers</option>
        <option value="MIN">Minnesota Twins</option>
        <option value="NYM">New York Mets</option>
        <option value="NYY">New York Yankees</option>
        <option value="OAK">Oakland Athletics</option>
        <option value="PHI">Philadelphia Phillies</option>
        <option value="PIT">Pittsburgh Pirates</option>
        <option value="SD">San Diego Padres</option>
        <option value="SEA">Seattle Mariners</option>
        <option value="SF">San Francisco Giants</option>
        <option value="STL">St. Louis Cardinals</option>
        <option value="TB">Tampa Bay Rays</option>
        <option value="TEX">Texas Rangers</option>
        <option value="TOR">Toronto Blue Jays</option>
        <option value="WSN">Washington Nationals</option>
      </select>

      <button type="submit">Register</button>

    </form>
  )
}

export default Register