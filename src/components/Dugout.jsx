import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"
import ChooseTemplate from "./ChooseTemplate"
import PlayerBasicInfo from "./forms/PlayerBasicInfo"
import StatsInput from "./forms/StatsInput"

import BaseballCard from "./BaseballCard"

function Dugout() {

  const [cardDemo, setCardDemo] = useState(false)

  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!user) {
    navigate("/")
  }

  return (
    <div className="dugout">
      <Navbar />

      <button style={{ zIndex: 10 }} onClick={() => setCardDemo(!cardDemo)}>
        {cardDemo ? "Show player input" : "Show baseball card"}
      </button>

      {cardDemo ? 
        <BaseballCard /> 

        :

        <div id="dugout-div">

          <div id="player-info-div">
            <PlayerBasicInfo />
          </div>

          <div id="choose-template-div">
            <ChooseTemplate />
          </div>
          
          <div id="player-stats-div">
            <StatsInput />
          </div>

        </div>

      }
      
      <Footer />
    </div>
  )
}

export default Dugout