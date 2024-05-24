import { useState } from "react"

import PlayerBasicInfo from "./forms/PlayerBasicInfo"
import PlayerPhotos from "./forms/PlayerPhotos"
import TeamLogo from "./forms/TeamLogo"
import LeagueLogo from "./forms/LeagueLogo"
import PitchStats from "./forms/PitchStats"
import HitStats from "./forms/HitStats"

const BaseballCard = ({ template }) => {

  const [cardData, setCardData] = useState({
    playerName: "",
    teamName: "",
    leagueName: "",
    playerBio: "",
    playerNumber: "",
    playerPosition1: "",
    playerPosition2: "",
    hittingStats: {
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
    pitchingStats: {
      W: "",
      L: "",
      SV: "",
      IP: "",
      H: "",
      R: "",
      ER: "",
      BB: "",
      SO: "",
      WHIP: "",
      K: "",
      ꓘ: "",
      HBP: "",
      ERA: "",
      G: "",
    }
  })

  const handleUpload = (e, statsApp) => {
    e.preventDefault()
    // TODO:
    // 1. Calculate file origin app - users select which statsApp generated the file and use that name as the parameter
    // 2. Submit the file to the proper API endpoint based on the app
    // 3. Once the file is processed, display the resulting data in a table or something
  }

  const handleLogoUpload = (e) => {
    e.preventDefault()
    // TODO:
    // 1. Calculate file origin app - users select which statsApp generated the file and use that name as the parameter
    // 2. Submit the file to the proper API endpoint based on the app
    // 3. Once the file is processed, display the resulting data in a table or something
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(cardData)
  }

  return (
    <div>
      <h1>Input Player Details: </h1>

      <form onSubmit={handleUpload}>
        <label htmlFor="csv-file">Upload your player's CSV file from Fangraphs</label>
        <input 
          type="file" 
          id="csv-file" 
          name="csv-file" 
          />

        <button type="submit">Submit</button>
      </form>

      <PlayerBasicInfo />
      <PlayerPhotos />
      <TeamLogo />
      <LeagueLogo />
      <PitchStats />
      <HitStats />
      
    </div>
  )
}

export default BaseballCard