import { useState } from "react"

import PlayerBasicInfo from "../PlayerBasicInfo.jsx"
import PlayerStats from "../PlayerStats.jsx"
import PlayerImgUpload from "../PlayerImgUpload.jsx"

import '../../styles/lockerRoom.css'

function LockerRoom({ player }) {

  const [tab, setTab] = useState("info")

  return (
    <div id="locker-room">

      <div id="locker-room-header">
        <h1>{player.firstName} {player.lastName}'s Locker Room</h1>
        <h3>Edit player info</h3>
      </div>

      <div id="locker-room-tabs">
        <button
          onClick={() => setTab("info")}
          >
            Player Info
        </button>
        <button
          onClick={() => setTab("stats")}
          >
            Player Stats
        </button>
        <button
          onClick={() => setTab("images")}
          >
            Player Images
        </button>
      </div>

      <div id="locker-room-content">

        {tab === "info" && 
        <PlayerBasicInfo 
          player={player}
          />
        } 
        {tab === "stats" &&
        <PlayerStats 
          player={player} 
          />
        }
        {tab === "images" &&
        <PlayerImgUpload 
          player={player} 
          />
        }
      </div>

    </div>
  )
}

export default LockerRoom