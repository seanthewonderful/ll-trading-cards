import { useState } from 'react'

const PlayerBasicInfo = () => {

  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    teamName: "",
    leagueName: "",
    bio: "",
    jerseyNumber: "",
    position1: "",
    position2: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(playerInfo)
  }

  return (
    <form id='player-basic-info' onSubmit={handleSubmit}>
      <label htmlFor="player-name">Player Name</label>
      <input 
        type="text"
        id="player-name" 
        name="player-name" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, name: e.target.value })}
        />

      <label htmlFor="team-name">Team Name</label>
      <input 
        type="text"
        id="team-name" 
        name="team-name" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, teamName: e.target.value })}
        />

      <label htmlFor="league-name">League Name</label>
      <input 
        type="text"
        id="league-name" 
        name="league-name" 
        onChange={(e) => setPlayerInfo({ ...playerInfo, leagueName: e.target.value })}
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