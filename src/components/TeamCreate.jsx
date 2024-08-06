import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import s3 from "../../aws/config.js";
import { v4 as uuidv4 } from "uuid";

import { MdClose } from "react-icons/md";
import texLogoFull from "../assets/team_logos/TEX/texas-rangers-logo.png";
import texLogoIcon from "../assets/team_logos/TEX/texas-rangers-t-logo.png";
import dodgerLogoIcon from "../assets/team_logos/LAD/LAD-logo.png"

import "../styles/teamCreate.css";

function TeamCreate({ closeModal }) {

  /*
  - save chosen files to state
  - on submit, each img file needs to upload to AWS S3
  - what happens when any of them fail? 
    - keep other values and give error feedback on image that is causing problems
  */

  const dispatch = useDispatch();
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    year: new Date().getFullYear(),
    teamPic: {
      url: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
      descriptor: "Team Picture",
    },
    teamImgFront: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
    teamImgBack: "",
    logoFull: {
      url: texLogoFull,
      descriptor: "Full Logo",
    },
    logoIcon: {
      url: texLogoIcon,
      descriptor: "Hat Logo",
    },
  });
  const [teamPhotos, setTeamPhotos] = useState({
    teamPic: null,
    logoFull: null,
    logoIcon: null,
  });
  const [fileLoading, setFileLoading] = useState({
    teamPic: false,
    logoFull: false,
    logoIcon: false,
  })
  const [imgMessages, setImgMessages] = useState({
    teamPic: "",
    logoFull: "",
    logoIcon: "",
  })

  console.log("teamPhotos: ", teamPhotos);

  const handleFileChange = (e, imgType) => {
    if (imgType === "teamPic") {
      setTeamPhotos({ ...teamPhotos, teamPic: e.target.files[0] });
    } else if (imgType === "logoFull") {
      setTeamPhotos({ ...teamPhotos, logoFull: e.target.files[0] });
    } else if (imgType === "logoIcon") {
      setTeamPhotos({ ...teamPhotos, logoIcon: e.target.files[0] });
    }
  }

  const handleUploadTeamPic = async () => {
    if (!teamPhotos.teamPic) {
      setImgMessages({
        ...imgMessages,
        teamPic: "Please select a file to upload."
      });
      return;
    }
    setFileLoading({
      ...fileLoading,
      teamPic: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${teamPhotos.teamPic.name}`,
      Body: teamPhotos.teamPic,
    };
    try {
      const data = await s3.upload(params).promise()
      setImgMessages({
        ...imgMessages,
        teamPic: `File uploaded successfully. File URL: ${data.Location}`,
      })
      setFileLoading({
        ...fileLoading,
        teamPic: false
      })
      axios.post('/api/createTeamPic', {
        url: data.Location
      })
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = () => {
    setTeamInfo({
      name: "",
      year: 2024,
      teamPic: {
        url: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
        descriptor: "Team Picture",
      },
      teamPicFront: "https://i.ytimg.com/vi/ynKateBMV1I/hq720.jpg",
      teamPicBack: "",
      logoFull: texLogoFull,
      logoIcon: texLogoIcon,
    });
    setFileLoading({
      teamPic: false,
      logoFull: false,
      logoIcon: false,
    })
    setImgMessages({
      teamPic: "",
      logoFull: "",
      logoIcon: "",
    })
    setTeamPhotos({
      teamPic: null,
      logoFull: null,
      logoIcon: null,
    });
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Team Info: ", teamInfo);
    axios.post("/api/newTeam", teamInfo)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "SET_USER",
          payload: res.data.user,
        });
        closeModal();
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="modal">
      <div id="team-create-div">
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
            max={new Date().getFullYear() + 1}
            value={teamInfo.year}
            onChange={(e) => setTeamInfo({ ...teamInfo, year: e.target.value })}
          />

          <label htmlFor="team-pic">Team Picture</label>
          <input
            type="file"
            id="team-pic-input"
            name="team-pic"
            onChange={(e) => handleFileChange(e, "teamPic")}
          />

          <label htmlFor="logo-full">Full Logo</label>
          <input
            type="file"
            id="logo-full-input"
            name="logo-full"
            onChange={(e) => handleFileChange(e, "logoFull")}
          />

          <label htmlFor="logo-icon">Icon Logo</label>
          <input
            type="file"
            id="logo-icon-input"
            name="logo-icon"
            onChange={(e) => handleFileChange(e, "logoIcon")}
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
