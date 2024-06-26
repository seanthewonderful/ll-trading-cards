import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Explanation from "./Explanation.jsx";
import Turnstyle from "./auth/Turnstyle.jsx";
import { useNavigate } from "react-router-dom";

function Welcome() {
  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [register, setRegister] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const loginClick = () => {
    openModal();
    setRegister(false);
  };

  const registerClick = () => {
    openModal();
    setRegister(true);
  };

  useEffect(() => {
    if (user) {
      navigate("/myteams");
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome</h1>
      

      <Explanation />

      <Turnstyle
        isOpen={modalOpen}
        onClose={closeModal}
        register={register}
        loginClick={loginClick}
        registerClick={registerClick}
      />

      <button onClick={loginClick}>Login</button>

      <button onClick={registerClick}>Register</button>
    </div>
  );
}

export default Welcome;
