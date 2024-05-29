import { useState } from 'react'
import { useDispatch } from 'react-redux'

const PlayerBasicInfo = () => {

  const [playerInfo, setPlayerInfo] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "1",
    homeTown: "",
    recoveryEmail: "",
    bio: "",
    jerseyNumber: "",
    position1: "",
    position2: "",
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
      <label htmlFor="player-name">First Name</label>
      <input 
        type="text"
        id="player-name" 
        name="player-name" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, firstName: e.target.value })}
        />

      <label htmlFor="last-name">Last Name</label>
      <input 
        type="text"
        id="last-name" 
        name="last-name" 
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
        onChange={(e) => setPlayerInfo({ ...playerInfo, homeTown: e.target.value })}
        />

      <label htmlFor="recovery-email">Recovery Email</label>
      <input 
        type="email"
        id="recovery-email" 
        name="recovery-email" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, recoveryEmail: e.target.value })}
        />

      <label htmlFor="bio">Bio</label>
      <textarea 
        id="bio" 
        name="bio" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, bio: e.target.value })}
        />

      <label htmlFor="jersey-number">Jersey Number</label>
      <input 
        type="number"
        id="jersey-number" 
        name="jersey-number" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, jerseyNumber: e.target.value })}
        />

      <label htmlFor="position1">Position 1</label>
      <select 
        id="position1" 
        name="position1" 
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