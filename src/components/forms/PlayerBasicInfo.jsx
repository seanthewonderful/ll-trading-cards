import { useState } from 'react'
import { useDispatch } from 'react-redux'

import '../../styles/playerBasicInfo.css'

const PlayerBasicInfo = () => {

  const [playerInfo, setPlayerInfo] = useState({
    firstName: "Jerry",
    lastName: "Baseball",
    birthMonth: "1",
    homeTown: "Inglewood",
    homeState: "CA",
    recoveryEmail: "",
    bio: "",
    jerseyNumber: "9",
    throws: "R",
    bats: "R",
    position1: "1",
    position2: "2",
  })

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(playerInfo)

    dispatch({ 
      type: "UPDATE_PLAYER_INFO",
      payload: playerInfo,
    })

  }

  return (
    <form id='player-basic-info' onSubmit={handleSubmit}>

      <legend>Player Basic Info</legend>

      <label htmlFor="first-name">First Name</label>
      <input 
        type="text"
        id="first-name" 
        name="first-name" 
        value={playerInfo.firstName}
        onChange={(e) => setPlayerInfo({ ...playerInfo, firstName: e.target.value })}
        />

      <label htmlFor="last-name">Last Name</label>
      <input 
        type="text"
        id="last-name" 
        name="last-name" 
        value={playerInfo.lastName}
        onChange={(e) => setPlayerInfo({ ...playerInfo, lastName: e.target.value })}
        />

      <label htmlFor="birth-month">Birth Month</label>
      <select 
        id='birth-month' 
        name='birth-month' 
        value={playerInfo.birthMonth}
        onChange={(e) => setPlayerInfo({ ...playerInfo, birthMonth: e.target.value })}>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <label htmlFor="home-town">Home Town</label>
      <input 
        type="text"
        id="home-town" 
        name="home-town" 
        value={playerInfo.homeTown}
        onChange={(e) => setPlayerInfo({ ...playerInfo, homeTown: e.target.value })}
        />

      <label htmlFor="home-state">Home State</label>
      <select 
        id="home-state" 
        name="home-state" 
        value={playerInfo.homeState}
        onChange={(e) => setPlayerInfo({ ...playerInfo, homeState: e.target.value })}
        >
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
      </select>

      <label htmlFor="recovery-email">Recovery Email</label>
      <input 
        type="email"
        id="recovery-email" 
        name="recovery-email" 
        value={playerInfo.recoveryEmail}
        onChange={(e) => setPlayerInfo({ ...playerInfo, recoveryEmail: e.target.value })}
        />

      <label htmlFor="bio">Bio</label>
      <textarea 
        id="bio" 
        name="bio" 
        value={playerInfo.bio}
        onChange={(e) => setPlayerInfo({ ...playerInfo, bio: e.target.value })}
        />

      <label htmlFor="jersey-number">Jersey Number</label>
      <input 
        type="number"
        id="jersey-number" 
        name="jersey-number" 
        value={playerInfo.jerseyNumber}
        onChange={(e) => setPlayerInfo({ ...playerInfo, jerseyNumber: e.target.value })}
        />

      <label htmlFor="throws">Throws</label>
      <select 
        id="throws" 
        name="throws" 
        value={playerInfo.throws}
        onChange={(e) => setPlayerInfo({ ...playerInfo, throws: e.target.value })}
        >
          <option value="R">Right</option>
          <option value="L">Left</option>
      </select>

      <label htmlFor="bats">Bats</label>
      <select 
        id="bats" 
        name="bats" 
        value={playerInfo.bats}
        onChange={(e) => setPlayerInfo({ ...playerInfo, bats: e.target.value })}
        >
          <option value="R">Right</option>
          <option value="L">Left</option>
          <option value="S">Switch</option>
      </select>

      <label htmlFor="position1">Position 1</label>
      <select 
        id="position1" 
        name="position1" 
        value={playerInfo.position1}
        onChange={(e) => setPlayerInfo({ ...playerInfo, position1: e.target.value })}
        >
          <option value="1">Pitcher</option>
          <option value="2">Catcher</option>
          <option value="3">First Base</option>
          <option value="4">Second Base</option>
          <option value="5">Third Base</option>
          <option value="6">Shortstop</option>
          <option value="7">Left Field</option>
          <option value="8">Center Field</option>
          <option value="9">Right Field</option>
      </select>

      <label htmlFor="position2">Position 2</label>
      <select 
        id="position2" 
        name="position2" 
        value={playerInfo.position2}
        onChange={(e) => setPlayerInfo({ ...playerInfo, position2: e.target.value })}
        >
          <option value="1">Pitcher</option>
          <option value="2">Catcher</option>
          <option value="3">First Base</option>
          <option value="4">Second Base</option>
          <option value="5">Third Base</option>
          <option value="6">Shortstop</option>
          <option value="7">Left Field</option>
          <option value="8">Center Field</option>
          <option value="9">Right Field</option>
      </select>

      <button type="submit">Submit</button>
      
    </form>
  )
}

export default PlayerBasicInfo