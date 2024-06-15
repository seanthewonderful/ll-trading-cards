import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../styles/dugout.css";

import PlayerCard from "../PlayerCard.jsx";
import PlayerCreate from "../PlayerCreate.jsx";

function Dugout() {
  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const teamData = useSelector(state => state.team);
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
      {modalOpen && 
        <PlayerCreate 
          teamId={teamData ? teamData.teamId : ""} 
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          />
      }

        <button 
          onClick={() => setModalOpen(true)}
          >
            Create New Player
        </button>

      <div id="player-cards-div">
        {playerCards}
      </div>

    </div>
  );
}

export default Dugout;
