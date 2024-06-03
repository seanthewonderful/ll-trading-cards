import TeamCreate from "./TeamCreate";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserTeams() {
  const user = useSelector((state) => state.user);
  const userTeams = useSelector((state) => state.userTeams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const createNewTeam = () => {
    const newTeam = {
      name: "New Team",
      year: "2024",
      players: [],
    };
    dispatch({
      type: "CREATE_TEAM",
      payload: newTeam,
    });
  };

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

        <section>
          {userTeams.map((team) => (
            <div>
              <p>{team.year}</p>
              <p>{team.name}</p>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default UserTeams;
