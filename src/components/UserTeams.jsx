import TeamCreate from "./TeamCreate";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/userTeams.css";

function UserTeams() {
  const user = useSelector((state) => state.user);
  const userTeams = useSelector((state) => state.userTeams);
  const navigate = useNavigate();

  const teamList = userTeams.map((team) => (
    <div key={team.teamId} className="team-card">
      <img
        src={team.teamLogos[0].url}
        alt="Team Photo"
        className="team-card-photo"
      />
      <p className="team-card-name">{team.name}</p>
      <p className="team-card-year">{team.year}</p>
    </div>
  ));

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div id="user-teams-div">
      {modalOpen && <TeamCreate closeModal={closeModal} />}

      <div id="user-teams-body">
        <button onClick={openModal}>Create New Team</button>

        <section>{teamList}</section>
      </div>

      <Footer />
    </div>
  );
}

export default UserTeams;
