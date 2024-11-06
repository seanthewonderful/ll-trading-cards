import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import s3 from "../../aws/config.js";
import { v4 as uuidv4 } from "uuid";

import { MdClose } from "react-icons/md";
import teamPhoto from "../assets/sandlot_cartoon.jpg";
import mlbLogo from "../assets/league_logos/MLB/mlb-logo.png";
import baseballIcon from "../assets/baseball_icon.png";

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
    teamImageURL: teamPhoto,
    teamLogoFullURL: mlbLogo,
    teamLogoIconURL: baseballIcon,
  });
  const [teamPhotos, setTeamPhotos] = useState({
    teamImage: null,
    teamLogoFull: null,
    teamLogoIcon: null,
  });
  const [fileLoading, setFileLoading] = useState({
    teamImage: false,
    teamLogoFull: false,
    teamLogoIcon: false,
  })
  const [imgMessages, setImgMessages] = useState({
    teamImage: "",
    teamLogoFull: "",
    teamLogoIcon: "",
  })

  console.log("teamPhotos: ", teamPhotos);

  const handleFileChange = (e, imgType) => {
    if (imgType === "teamImage") {
      setTeamPhotos({ ...teamPhotos, teamImage: e.target.files[0] });
    } else if (imgType === "teamLogoFull") {
      setTeamPhotos({ ...teamPhotos, teamLogoFull: e.target.files[0] });
    } else if (imgType === "teamLogoIcon") {
      setTeamPhotos({ ...teamPhotos, teamLogoIcon: e.target.files[0] });
    }
  }

  const handleUploadTeamImage = async () => {
    if (!teamPhotos.teamImage) {
      setImgMessages({
        ...imgMessages,
        teamImage: "Please select a file to upload."
      });
      return;
    }
    setFileLoading({
      ...fileLoading,
      teamImage: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${teamPhotos.teamImage.name}`,
      Body: teamPhotos.teamImage,
    };
    try {
      const data = await s3.upload(params).promise()
      setImgMessages({
        ...imgMessages,
        teamImage: `File uploaded successfully. File URL: ${data.Location}`,
      })
      setFileLoading({
        ...fileLoading,
        teamImage: false
      })
    } catch (err) {
      console.log(err);
      setImgMessages({
        ...imgMessages,
        teamImage: "Error uploading file. Please try again."
      })
      setFileLoading({
        ...fileLoading,
        teamImage: false
      })
    }
  };

  const handleUploadLogoFull = async () => {
    if (!teamPhotos.teamLogoFull) {
      setImgMessages({
        ...imgMessages,
        teamLogoFull: "Please select a file to upload."
      });
      return;
    }
    setFileLoading({
      ...fileLoading,
      teamLogoFull: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${teamPhotos.teamLogoFull.name}`,
      Body: teamPhotos.teamLogoFull,
    };
    try {
      const data = await s3.upload(params).promise()
      setImgMessages({
        ...imgMessages,
        teamLogoFull: `File uploaded successfully. File URL: ${data.Location}`,
      })
      setFileLoading({
        ...fileLoading,
        teamLogoFull: false
      })
    } catch (err) {
      console.log(err);
      setImgMessages({
        ...imgMessages,
        teamLogoFull: "Error uploading file. Please try again."
      })
      setFileLoading({
        ...fileLoading,
        teamLogoFull: false
      })
    }
  };

  const handleUploadLogoIcon = async () => {
    if (!teamPhotos.teamLogoIcon) {
      setImgMessages({
        ...imgMessages,
        teamLogoIcon: "Please select a file to upload."
      });
      return;
    }
    setFileLoading({
      ...fileLoading,
      teamLogoIcon: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${teamPhotos.teamLogoIcon.name}`,
      Body: teamPhotos.teamLogoIcon,
    };
    try {
      const data = await s3.upload(params).promise()
      setImgMessages({
        ...imgMessages,
        teamLogoIcon: `File uploaded successfully. File URL: ${data.Location}`,
      })
      setFileLoading({
        ...fileLoading,
        teamLogoIcon: false
      })
    } catch (err) {
      console.log(err);
      setImgMessages({
        ...imgMessages,
        teamLogoIcon: "Error uploading file. Please try again."
      })
      setFileLoading({
        ...fileLoading,
        teamLogoIcon: false
      })
    }
  };

  const cancel = () => {
    setTeamInfo({
      name: "",
      year: 2024,
      teamImageURL: teamPhoto,
      teamLogoFull: mlbLogo,
      teamLogoIcon: baseballIcon,
    });
    setFileLoading({
      teamImage: false,
      teamLogoFull: false,
      logoIcon: false,
    })
    setImgMessages({
      teamImage: "",
      teamLogoFull: "",
      logoIcon: "",
    })
    setTeamPhotos({
      teamImage: null,
      teamLogoFull: null,
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
            onChange={(e) => handleFileChange(e, "teamImage")}
          />

          <label htmlFor="logo-full">Full Logo</label>
          <input
            type="file"
            id="logo-full-input"
            name="logo-full"
            onChange={(e) => handleFileChange(e, "teamLogoFull")}
          />

          <label htmlFor="logo-icon">Icon Logo</label>
          <input
            type="file"
            id="logo-icon-input"
            name="logo-icon"
            onChange={(e) => handleFileChange(e, "teamLogoIcon")}
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
