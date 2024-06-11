import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PlayerCreate({ teamId }) {

  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "",
    homeTown: "",
    recoveryEmail: "",
    teamId: teamId,
  });

  const dispatch = useDispatch();

  const createPlayer = (e) => {
    e.preventDefault();
    console.log(playerData);
    axios.post('/api/createPlayer', playerData)
    .then((res) => {
      // setPlayers([...players, res.data.newPlayer])
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
    <div id='player-create-div'>

      <form onSubmit={createPlayer}>
        <input 
          type="text"
          placeholder="First Name"
          value={playerData.firstName}
          onChange={(e) => setPlayerData({ ...playerData, firstName: e.target.value })}
          />

        <input 
          type="text"
          placeholder="Last Name"
          value={playerData.lastName}
          onChange={(e) => setPlayerData({ ...playerData, lastName: e.target.value })}
          />

        <input 
          type="text"
          placeholder="Birth Month"
          value={playerData.birthMonth}
          onChange={(e) => setPlayerData({ ...playerData, birthMonth: e.target.value })}
          />

        <input 
          type="text"
          placeholder="Home Town"
          value={playerData.homeTown}
          onChange={(e) => setPlayerData({ ...playerData, homeTown: e.target.value })}
          />

        <input 
          type="text"
          placeholder="Email"
          value={playerData.recoveryEmail}
          onChange={(e) => setPlayerData({ ...playerData, recoveryEmail: e.target.value })}
          />

        <input type="submit" />
      </form>
    </div>
  )
}

export default PlayerCreate