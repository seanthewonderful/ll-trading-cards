import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeamCard({ team }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTeamCardClick = () => {

    dispatch({
      type: "SET_TEAM",
      payload: team
    })
    navigate(`/dugout`);
  }

  return (
    <div 
      className="team-card"
      onClick={handleTeamCardClick}
      >
      <img
        src={team.teamImageFront.url}
        alt="Team Photo Front"
        className="team-card-photo"
        />
      <p className="team-card-name">{team.name}</p>
      <img 
        src={team.teamLogos.filter(logo => logo.descriptor === "Full Logo")[0].url} 
        className="team-card-logo" 
        alt="" 
        />
      <p className="team-card-year">{team.year}</p>
    </div>
  )
}

export default TeamCard