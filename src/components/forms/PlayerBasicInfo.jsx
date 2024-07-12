import { useState, useContext, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { DugoutContext } from '../../functions/contexts'
import axios from 'axios'

import '../../styles/playerBasicInfo.css'
import states from '../../assets/states.json'
import countries from '../../assets/countries.json'
import notify from '../../functions/toasts.js'

import PlayerImgUpload from '../PlayerImgUpload'

function PlayerBasicInfo({ player }) {

  const { playerSelected, setPlayerSelected } = useContext(DugoutContext)
  console.log('playerSelected: ', playerSelected)

  const [playerInfo, setPlayerInfo] = useState({
    firstName: player.firstName,
    lastName: player.lastName,
    birthMonth: player.birthMonth || "",
    homeTown: player.homeTown || "",
    homeCountry: player.homeCountry || "US",
    homeState: player.homeState || "",
    bio: player.bio || "",
    jerseyNumber: player.jerseyNumber || "",
    throws: player.throws || "R",
    bats: player.bats || "R",
    position1: player.position1 || "1",
    position2: player.position2 || "2",
    recoveryEmail: player.recoveryEmail || "",
  })
  console.log('playerInfo: ', player)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(playerInfo)
    const bodyObj = {
      playerId: player.playerId,
      teamId: player.teamId,
      playerInfo
    }
    axios.put(`/api/updatePlayer`, bodyObj)
    .then((res) => {
      dispatch({
        type: "SET_TEAM",
        payload: res.data.team
      })
      notify('success', 'Basic Info Updated')
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setPlayerSelected({
      selected: false,
      player: null
    })
  }

  return (
    <form id='player-basic-info' onSubmit={handleSubmit}>

      <legend>Player Basic Info</legend>

      <PlayerImgUpload 
        playerId={player.playerId} 

        />

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

      <label htmlFor="player-create-home-country">
        Home Country
      </label>
      <select
        name='player-create-home-country'
        value={playerInfo.homeCountry}
        onChange={(e) => setPlayerInfo({ ...playerInfo, homeCountry: e.target.value })}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option
            key={`country-${country.code}`}
            value={country.code}
          >
            {country.name}
          </option>
        )
        )}
      </select>

      {playerInfo.homeCountry === "US" && (
        <>
          <label htmlFor="player-create-home-state">
            Home State
          </label>
          <select
            name='player-create-home-state'
            value={playerInfo.homeState}
            onChange={(e) => setPlayerInfo({ ...playerInfo, homeState: e.target.value })}
          >
            <option value="">Select State</option>
            {states.map((state) => {
              return (
                <option
                  key={`state-${state.abbreviation}`}
                  value={state.abbreviation}
                >
                  {state.name}
                </option>
              )
            })}
          </select>
        </>
      )}

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
        min={0}
        max={99}
        onChange={(e) => {
          // TODO: if number is out of range, set it to min/max range
          if (e.target.value < 0) {
            e.target.value = 0
          } else if (e.target.value > 99) {
            e.target.value = 99
          }
          setPlayerInfo({ ...playerInfo, jerseyNumber: e.target.value })
        }}
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
      <button onClick={handleCancel}>Cancel</button>

    </form>
  )
}

export default PlayerBasicInfo