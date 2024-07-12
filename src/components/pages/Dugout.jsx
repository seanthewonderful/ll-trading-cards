import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";

import "../../styles/dugout.css";

import PlayerCard from "../PlayerCard.jsx";
import PlayerCreate from "../PlayerCreate.jsx";
import LockerRoom from "./LockerRoom.jsx";

import { DugoutContext } from "../../functions/contexts.js";

function Dugout() {
  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [playerSelected, setPlayerSelected] = useState({
    selected: false,
    player: null
  });

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
    <DugoutContext.Provider 
      value={{ playerSelected, setPlayerSelected }}
      >

      <div id="dugout-div">
        {modalOpen && 
          <PlayerCreate 
            teamId={teamData ? teamData.teamId : ""} 
            modalOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
            />
        }

        {!playerSelected.selected &&
        <>
        <button 
        onClick={() => setModalOpen(true)}
        >
            Create New Player
        </button>

        <h1>Your {teamData ? teamData.year : ""} {teamData ? teamData.name : ""} Players</h1>
        </>
        }

        {playerSelected.selected ? 
        <div id="player-selected-div">

          <section id="player-selected-section">
            {playerCards.filter((player) => player.props.player.playerId === playerSelected.player.playerId)}
            <p>Click player to go back</p>
          </section>

          <section id="player-selected-lockerroom-section">
            <LockerRoom player={playerSelected.player} /> 
          </section>
        </div>
        : 
        <div id="player-cards-div">
          {playerCards}
        </div>
        } 

      </div>

    </DugoutContext.Provider>
  );
}

export default Dugout;
