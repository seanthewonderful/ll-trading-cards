import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Navbar from "./Navbar"
import Footer from "./Footer"
import ChooseTemplate from "./ChooseTemplate"
import PlayerBasicInfo from "./forms/PlayerBasicInfo"
import PlayerStats from "./forms/PlayerStats"

function Dugout() {

  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!user) {
    navigate("/")
  }

  return (
    <div className="dugout">
      <Navbar />

      <div id="dugout-div">

        <div id="player-info-div">
          <PlayerBasicInfo />
        </div>

        <div id="choose-template-div">
          <ChooseTemplate />
        </div>
        
        <div id="player-stats-div">
          <PlayerStats />
        </div>

      </div>
      
      <Footer />
    </div>
  )
}

export default Dugout