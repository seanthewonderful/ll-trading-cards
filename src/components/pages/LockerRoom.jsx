import { useLocation } from "react-router-dom"
import { useState } from "react"

import PlayerBasicInfo from "../forms/PlayerBasicInfo"
import PlayerStats from "../forms/PlayerStats"

import '../../styles/lockerRoom.css'

function LockerRoom() {

  const { state } = useLocation()
  console.log(state)

  const [infoTab, setInfoTab] = useState(true)

  return (
    <div id="locker-room">

      <div id="locker-room-header">
        <h1>{state.player.firstName} {state.player.lastName}'s Locker Room</h1>
        <h3>Edit player info</h3>
      </div>

      <div id="locker-room-tabs">
        <button
          onClick={() => setInfoTab(true)}
          >
            Player Info
        </button>
        <button
          onClick={() => setInfoTab(false)}
          >
            Player Stats
        </button>
      </div>

      <div id="locker-room-content">
        {infoTab ? <PlayerBasicInfo state={state} /> : <PlayerStats state={state} />}
      </div>

      <div>
        {state.player.firstName} {state.player.lastName}
      </div>
    </div>
  )
}

export default LockerRoom