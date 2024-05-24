import { useState } from 'react'
import TeamStats from './TeamStats'

function PlayerStats() {

  const [playerStats, setPlayerStats] = useState({
    batting: {
      PA: "",
      AB: "",
      runs: "",
      hits: "",
      rbi: "",
      sb: "",
      bb: "",
      avg: "",
      obp: "",
      slg: "",
      ops: "",
    },
    pitching: {
      W: "",
      L: "",
      SV: "",
      IP: "",
      H: "",
      R: "",
      ER: "",
      BB: "",
      HBP: "",
      SO: "",
      WHIP: "",
    },
  })

  return (
    <div>
      <TeamStats />
    </div>
  )
}

export default PlayerStats