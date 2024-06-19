import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import countries from '../assets/countries.json'
import states from '../assets/states.json'

function PlayerCreate({ teamId, closeModal }) {

  const [warning, setWarning] = useState(false);
  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "",
    homeTown: "",
    homeCountry: "US",
    homeState: "",
    recoveryEmail: "",
    imgUrl: "",
    teamId: teamId,
  });

  const dispatch = useDispatch();

  const createPlayer = (e) => {
    e.preventDefault();
    
    if (!playerData.firstName || !playerData.lastName) {
      setWarning(true);
      return
    }

    try {
      axios.post('/api/createPlayer', playerData)
      .then((res) => {
        setPlayerData({
          firstName: "",
          lastName: "",
          birthMonth: "",
          homeTown: "",
          homeCountry: "US",
          homeState: "",
          recoveryEmail: "",
          teamId: teamId,
        })
        dispatch({
          type: "SET_TEAM",
          payload: res.data.team
        })
        dispatch({
          type: "SET_USER",
          payload: res.data.user
        })
        closeModal();
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="modal">

      <div id='player-create-div'>

        <h1>Create New Player</h1>

        <form onSubmit={createPlayer}>

          <label htmlFor="player-create-first-name">
            First Name
          </label>
          <input 
            name='player-create-first-name'
            type="text"
            placeholder="First Name"
            value={playerData.firstName}
            onChange={(e) => {
              setPlayerData({ ...playerData, firstName: e.target.value })
              setWarning(false)
            }}
            />

          {warning && <p className="warning">Please enter a first and last name</p>}

          <label htmlFor="player-create-last-name">
            Last Name
          </label>
          <input 
            name='player-create-last-name'
            type="text"
            placeholder="Last Name"
            value={playerData.lastName}
            onChange={(e) => {
              setPlayerData({ ...playerData, lastName: e.target.value })
              setWarning(false)
            }}
            />

          {warning && <p className="warning">Please enter a first and last name</p>}

          <label htmlFor="player-create-birth-month">
            Birth Month
          </label>
          <select
            name='player-create-birth-month'
            value={playerData.birthMonth}
            onChange={(e) => setPlayerData({ ...playerData, birthMonth: e.target.value })}
            >
            <option value="">Select Month</option>
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

          <label htmlFor="player-create-home-town">
            Home Town
          </label>
          <input 
            name='player-create-home-town'
            type="text"
            placeholder="Home Town"
            value={playerData.homeTown}
            onChange={(e) => setPlayerData({ ...playerData, homeTown: e.target.value })}
            />

          <label htmlFor="player-create-home-country">
            Home Country
          </label>
          <select
            name='player-create-home-country'
            value={playerData.homeCountry}
            onChange={(e) => setPlayerData({ ...playerData, homeCountry: e.target.value })}
            >
            <option value="">Select Country</option>
            {countries.map((country) =>  (
                <option 
                  key={`country-${country.code}`} 
                  value={country.code}
                  >
                    {country.name}
                </option>
              )
              )}
          </select>

          {playerData.homeCountry === "US" && (
            <>
            <label htmlFor="player-create-home-state">
              Home State
            </label>
            <select
              name='player-create-home-state'
              value={playerData.homeState}
              onChange={(e) => setPlayerData({ ...playerData, homeState: e.target.value })}
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

          <label htmlFor="player-create-recovery-email">
            Recovery Email
          </label>
          <input 
            name='player-create-recovery-email'
            type="text"
            placeholder="Email"
            value={playerData.recoveryEmail}
            onChange={(e) => setPlayerData({ ...playerData, recoveryEmail: e.target.value })}
            />

          <button type="submit" >Submit</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
        
      </div>

    </div>
  )
}

export default PlayerCreate