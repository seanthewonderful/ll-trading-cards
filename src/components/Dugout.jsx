import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ChooseTemplate from "./ChooseTemplate";
import PlayerBasicInfo from "./forms/PlayerBasicInfo";
import PlayerStats from "./forms/PlayerStats";

import BaseballCardFront from "./BaseballCardFront";
import BaseballCardBack from "./BaseballCardBack";

function Dugout() {
  const [cardDemo, setCardDemo] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const user = useSelector((state) => state.user);
  const playerInfo = useSelector((state) => state.playerInfo);
  const playerStats = useSelector((state) => state.playerStats);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="dugout">
      <button style={{ zIndex: 10 }} onClick={() => setCardDemo(!cardDemo)}>
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
            {/* <StatsInput playerStats={playerStats} /> */}
            <PlayerStats playerStats={playerStats} />
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default Dugout;
