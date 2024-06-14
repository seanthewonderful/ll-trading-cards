import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../redux/store.js";

import ChooseTemplate from "../ChooseTemplate.jsx";
import PlayerBasicInfo from "../forms/PlayerBasicInfo.jsx";
import PlayerStats from "../forms/PlayerStats.jsx";
import BaseballCardFront from "../BaseballCardFront.jsx";
import BaseballCardBack from "../BaseballCardBack.jsx";
import PlayerCard from "../PlayerCard.jsx";

import axios from "axios";
import PlayerCreate from "../PlayerCreate.jsx";

function Dugout() {
  const [cardDemo, setCardDemo] = useState(false);
  const [showBack, setShowBack] = useState(false);
  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teamData = useSelector(state => state.team);
  console.log(teamData)
  let players = teamData ? teamData.players : [];

  let playerCards = players.map((player) => (
    <PlayerCard 
      player={player} 
      key={player.playerId} 
      />
  ));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!teamData) {
      navigate("/myteams");
    } else {
      dispatch({
        type: "SET_TEAM",
        payload: teamData
      })
    }

    return () => {
      dispatch({
        type: "CLEAR_TEAM"
      })
    }
  }, []);

  return (
    <div id="dugout-div">

      <PlayerCreate teamId={teamData ? teamData.teamId : ""} />

      <div id="player-cards-div">
        {playerCards}
      </div>
      
      {/* <button style={{ zIndex: 10 }} onClick={() => setCardDemo(!cardDemo)}>
        {cardDemo ? "Show player input" : "Show baseball card"}
      </button>

      {cardDemo ? (
        <>
          {showBack ? (
            <BaseballCardBack />
          ) : (
            <BaseballCardFront
              playerInfo={playerInfo}
              playerStats={playerStats}
            />
          )}
          <button style={{ zIndex: 10 }} onClick={() => setShowBack(!showBack)}>
            {showBack ? "Show front" : "Show back"}
          </button>
        </>
      ) : (
        <div id="dugout-div">
          <div id="player-info-div">
            <PlayerBasicInfo playerInfo={playerInfo} />
          </div>

          <div id="choose-template-div">
            <ChooseTemplate />
          </div>

          <div id="player-stats-div">
            <PlayerStats playerStats={playerStats} />
          </div>
        </div>
      )} */}

    </div>
  );
}

export default Dugout;

// export const dugoutLoader = async () => {
//   const teamId = store.getState().teamId;
//   const { data } = await axios.get(`/api/team/${teamId}`);
//   return data.team;
// }