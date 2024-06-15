import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

function PlayerCreate({ teamId, closeModal }) {

  const [warning, setWarning] = useState(false);
  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "",
    homeTown: "",
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
    axios.post('/api/createPlayer', playerData)
    .then((res) => {
      setPlayerData({
        firstName: "",
        lastName: "",
        birthMonth: "",
        homeTown: "",
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
    })
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
          <input 
            name='player-create-birth-month'
            type="text"
            placeholder="Birth Month"
            value={playerData.birthMonth}
            onChange={(e) => setPlayerData({ ...playerData, birthMonth: e.target.value })}
            />

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