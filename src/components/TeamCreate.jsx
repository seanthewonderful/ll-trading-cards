import { useState } from "react";
import axios from "axios";

import { MdClose } from "react-icons/md";
import texLogoFull from "../assets/team_logos/TEX/texas-rangers-logo.png";
import texLogoIcon from "../assets/team_logos/TEX/texas-rangers-t-logo.png";
import { useDispatch } from "react-redux";

function TeamCreate({ closeModal }) {
  const dispatch = useDispatch();
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    year: 2024,
    teamPic: {
      url: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
      descriptor: "Team Picture",
    },
    logoFull: {
      url: texLogoFull,
      descriptor: "Full Logo",
    },
    logoIcon: {
      url: texLogoIcon,
      descriptor: "Hat Logo",
    },
  });

  const uploadImage = (imgFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setTeamInfo({ ...teamInfo, teamPic: reader.result });
      }
    };
    reader.readAsDataURL(imgFile);
  };

  const cancel = () => {
    setTeamInfo({
      name: "",
      year: 2024,
      teamPic: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
      logoFull: texLogoFull,
      logoIcon: texLogoIcon,
    });
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Team Info: ", teamInfo);
    axios.post("/api/newTeam", teamInfo).then((res) => {
      console.log(res.data);
      dispatch({
        type: "CREATE_TEAM",
        payload: res.data.newTeam,
      });
      closeModal();
    });
  };

  return (
    <div className="modal">
      <div id="create-team-modal">
        <button onClick={closeModal}>
          <MdClose />
        </button>
        <form
          className="modal-form"
          id="create-team-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="team-name">Team Name</label>
          <input
            type="text"
            id="team-name-input"
            name="team-name"
            value={teamInfo.name}
            onChange={(e) => setTeamInfo({ ...teamInfo, name: e.target.value })}
          />

          <label htmlFor="team-year">Team Year</label>
          <input
            type="number"
            id="team-year-input"
            name="team-year"
            min={2000}
            max={2050}
            value={teamInfo.year}
            onChange={(e) => setTeamInfo({ ...teamInfo, year: e.target.value })}
          />

          <label htmlFor="team-pic">Team Picture</label>
          <input
            type="file"
            id="team-pic-input"
            name="team-pic"
            disabled
            onChange={(e) => {
              let imgFile = e.target.files[0];
              uploadImage(imgFile);
              setTeamInfo({
                ...teamInfo,
                teamPic: URL.createObjectURL(imgFile),
              });
            }}
          />

          <label htmlFor="logo-full">Full Logo</label>
          <input
            type="file"
            id="logo-full-input"
            name="logo-full"
            disabled
            onChange={(e) => {
              let imgFile = e.target.files[0];
              uploadImage(imgFile);
              setTeamInfo({
                ...teamInfo,
                logoFull: URL.createObjectURL(imgFile),
              });
            }}
          />

          <label htmlFor="logo-icon">Icon Logo</label>
          <input
            type="file"
            id="logo-icon-input"
            name="logo-icon"
            disabled
            onChange={(e) => {
              let imgFile = e.target.files[0];
              uploadImage(imgFile);
              setTeamInfo({
                ...teamInfo,
                logoIcon: URL.createObjectURL(imgFile),
              });
            }}
          />

          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <button onClick={cancel}>Cancel</button>
            <input type="submit" value="Create Team" />
          </section>
        </form>
      </div>
    </div>
  );
}

export default TeamCreate;
