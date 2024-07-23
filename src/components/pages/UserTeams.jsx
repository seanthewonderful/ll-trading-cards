import TeamCreate from "../TeamCreate.jsx";
import TeamCard from "../TeamCard.jsx";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../styles/userTeams.css";

function UserTeams() {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  let teamList;

  try {
    teamList = user.userTeams.map((team) => (
      <TeamCard team={team} key={team.teamId} />
    ));
  } catch (error) {
    teamList = []
  }

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div id="user-teams-div">
      {modalOpen && <TeamCreate closeModal={closeModal} />}

      <div id="user-teams-body">
        <button onClick={openModal}>Create New Team</button>

        <section>{teamList}</section>
      </div>

    </div>
  );
}

export default UserTeams;
