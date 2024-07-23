import { useState, useContext } from 'react';
import s3 from '../../aws/config.js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { DugoutContext } from '../functions/contexts.js';

const PlayerImgUpload = ({ player }) => {

  console.log(`PlayerImgUpload player: `, player)
  
  const [file, setFile] = useState({
    imgFront: null,
    imgBack: null
  });
  const [fileLoading, setFileLoading] = useState({
    imgFront: false,
    imgBack: false
  });
  const [messageImgFront, setMessageImgFront] = useState('');
  const [messageImgBack, setMessageImgBack] = useState('');
  const [imgFrontUrl, setImgFrontUrl] = useState(player.playerImageFront?.url || '');
  const [imgBackUrl, setImgBackUrl] = useState(player.playerImageBack?.url || '');

  const dispatch = useDispatch();
  const { setPlayerSelected } = useContext(DugoutContext);

  const handleFileChange = (e, side) => {
    console.log(`side: `, side)
    if (side === 'front') {
      setFile({
        ...file, 
        imgFront: e.target.files[0]
      }); 
    } else if (side === 'back') {
      setFile({
        ...file, 
        imgBack: e.target.files[0]
      }); 
    }
  };

  const handleUploadImgFront = async () => {
    if (!file.imgFront) {
      setMessageImgFront('Please select a file to upload.');
      return;
    }

    setFileLoading({
      ...fileLoading,
      imgFront: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.imgFront.name}`,
      Body: file.imgFront,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessageImgFront(`File uploaded successfully. File URL: ${data.Location}`);
      setFileLoading({
        ...fileLoading,
        imgFront: false
      });
      axios.post('/api/createPlayerImageFront', { 
        playerId: player.playerId, 
        imgUrl: data.Location 
      })
      .then(res => {
        console.log(`res: `, res)
        dispatch({ 
          type: "SET_TEAM",
          payload: res.data.team
        })
        dispatch({ 
          type: "SET_USER",
          payload: res.data.user
        })
        setPlayerSelected({
          selected: true,
          player: res.data.player
        })
        setImgFrontUrl(data.Location);
      })
    } catch (error) {
      console.log(`error: `, error)
      setMessageImgFront(`Error uploading file: ${error.message}`);
      setFileLoading({
        ...fileLoading,
        imgFront: false
      });
    }
  };

  const handleUploadImgBack = async () => {
    if (!file.imgBack) {
      setMessageImgBack('Please select a file to upload.');
      return;
    }

    setFileLoading({
      ...fileLoading,
      imgBack: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.imgBack.name}`,
      Body: file.imgBack,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessageImgBack(`File uploaded successfully. File URL: ${data.Location}`);
      setImgBackUrl(data.Location);
      setFileLoading({
        ...fileLoading,
        imgBack: false
      });
      axios.post('/api/createPlayerImageBack', { 
        playerId: player.playerId, 
        imgUrl: data.Location 
      })
      .then(res => {
        console.log(`res: `, res)
        dispatch({
          type: "SET_TEAM",
          payload: res.data.team
        })
        dispatch({ 
          type: "SET_USER",
          payload: res.data.user
        })
        setPlayerSelected({
          selected: true,
          player: res.data.player
        })
      })

    } catch (error) {
      setMessageImgBack(`Error uploading file: ${error.message}`);
      setFileLoading({
        ...fileLoading,
        imgBack: false
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="image-front">Upload Image for Card Front</label>
      <input 
        type="file" 
        name="image-front"
        onChange={(e) => handleFileChange(e, "front")} 
        accept='image/*'
        />
      <button onClick={handleUploadImgFront}>Upload</button>

      {fileLoading.imgFront && <p>Loading...</p>}
      {messageImgFront && <p>{messageImgFront}</p>}
      {imgFrontUrl && <img style={{ maxWidth: '50px' }} src={imgFrontUrl} alt="uploaded" />}

      <label htmlFor="image-back">Upload Image for Card Back</label>
      <input 
        type="file" 
        name="image-back"
        onChange={(e) => handleFileChange(e, "back")} 
        accept='image/*'
        />
      <button onClick={handleUploadImgBack}>Upload</button>
      
      {fileLoading.imgBack && <p>Loading...</p>}
      {messageImgBack && <p>{messageImgBack}</p>}
      {imgBackUrl && <img style={{ maxWidth: '50px' }} src={imgBackUrl} alt="uploaded" />}
    </div>
  );
};

export default PlayerImgUpload;
