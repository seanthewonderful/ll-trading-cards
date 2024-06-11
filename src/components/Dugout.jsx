import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useDebugValue, useEffect, useState } from "react";
import store from "../redux/store.js";

import ChooseTemplate from "./ChooseTemplate";
import PlayerBasicInfo from "./forms/PlayerBasicInfo";
import PlayerStats from "./forms/PlayerStats";
import BaseballCardFront from "./BaseballCardFront";
import BaseballCardBack from "./BaseballCardBack";
import PlayerCard from "./PlayerCard.jsx";

import axios from "axios";
import PlayerCreate from "./PlayerCreate.jsx";

function Dugout() {
  const [cardDemo, setCardDemo] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const user = useSelector((state) => state.user);
  // const playerInfo = useSelector((state) => state.playerInfo);
  // const playerStats = useSelector((state) => state.playerStats);
  const navigate = useNavigate();

  // const teamData = useLoaderData();
  const teamData = useSelector(state => state.team);
  console.log(teamData)
  let players = teamData ? teamData.players : [];

  let playerCards = players.map((player) => (
    <PlayerCard player={player} key={player.playerId} />
  ));

  useEffect(() => {
    console.log("HIT useEffect")
    if (!user || !teamData) {
      navigate("/teams");
    }
  }, []);

  return (
    <div className="dugout">

      <PlayerCreate teamId={teamData ? teamData.teamId : ""} />

      {playerCards}
      
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