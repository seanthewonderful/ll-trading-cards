import { useSelector } from "react-redux";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../redux/store.js";

import ChooseTemplate from "./ChooseTemplate";
import PlayerBasicInfo from "./forms/PlayerBasicInfo";
import PlayerStats from "./forms/PlayerStats";
import BaseballCardFront from "./BaseballCardFront";
import BaseballCardBack from "./BaseballCardBack";
import PlayerCard from "./PlayerCard.jsx";

import axios from "axios";

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
  const [players, setPlayers] = useState(teamData ? teamData.players : []);

  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    birthMonth: "",
    homeTown: "",
    recoveryEmail: "",
    teamId: teamData ? teamData.teamId : "",
  });

  const createPlayer = (e) => {
    e.preventDefault();
    console.log(playerData);
    axios.post('/api/createPlayer', playerData)
    .then((res) => {
      setPlayers([...players, res.data.newPlayer])
    })
  }

  useEffect(() => {
    if (!user || !teamData) {
      navigate("/teams");
    }
  }, []);

  let playerCards = []
  if (players) {
    playerCards = players.map((player) => (
      <PlayerCard player={player} key={player.playerId} />
      
    ));
  }

  return (
    <div className="dugout">

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