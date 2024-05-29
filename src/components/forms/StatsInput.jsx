import { useState } from "react"

import TeamStats from "./TeamStats"
import PlayerStats from "./PlayerStats"

function StatsInput() {

  const [showTeamStats, setShowTeamStats] = useState(false)

  return (
    <div id="stats-input-div">
      {/* <button onClick={() => setShowTeamStats(!showTeamStats)}>
        {showTeamStats ? "Show Player Stats" : "Show Team Stats"}
      </button>
      {showTeamStats ? <TeamStats /> : <PlayerStats />} */}
      <PlayerStats />
    </div>
  )
}

export default StatsInput