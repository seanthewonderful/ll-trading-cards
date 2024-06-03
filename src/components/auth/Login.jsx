import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    await axios
      .post("/api/login", body)
      .then((res) => {
        onClose();
        dispatch({ type: "SET_USER", payload: res.data.user });
      })
      .catch((err) => console.warn("LOGIN ERROR: ", err.response.data.message));
  };

  return (
    <form className="modal-form" id="login-form" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        autoFocus
        onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) =>
          setLoginInfo({ ...loginInfo, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
