import React, { useState } from 'react';
import s3 from '../../aws/config.js';
import { v4 as uuidv4 } from 'uuid';

const PlayerImgUpload = ({ player }) => {

  console.log("PlayerImgUpload player: ", player)
  
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState({
    imgFront: false,
    imgBack: false
  });
  const [messageImgFront, setMessageImgFront] = useState('');
  const [messageImgBack, setMessageImgBack] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImgFront = async () => {
    if (!file) {
      setMessageImgFront('Please select a file to upload.');
      return;
    }

    setFileLoading({
      ...fileLoading,
      imgFront: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.name}`,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessageImgFront(`File uploaded successfully. File URL: ${data.Location}`);
      setImageUrl(data.Location);
      setFileLoading({
        ...fileLoading,
        imgFront: false
      });
    } catch (error) {
      setMessageImgFront(`Error uploading file: ${error.message}`);
      setFileLoading({
        ...fileLoading,
        imgFront: false
      });
    }
  };

  const handleUploadImgBack = async () => {
    if (!file) {
      setMessageImgBack('Please select a file to upload.');
      return;
    }

    setFileLoading({
      ...fileLoading,
      imgBack: true
    });
    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.name}`,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessageImgBack(`File uploaded successfully. File URL: ${data.Location}`);
      setFileLoading({
        ...fileLoading,
        imgBack: false
      });
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
        onChange={handleFileChange} 
        accept='image/*'
        />
      <button onClick={handleUploadImgFront}>Upload</button>

      {fileLoading && <p>Loading...</p>}
      {messageImgFront && <p>{messageImgFront}</p>}
      {imageUrl && <img style={{ maxWidth: '50px' }} src={imageUrl} alt="uploaded" />}

      <label htmlFor="image-back">Upload Image for Card Back</label>
      <input 
        type="file" 
        name="image-back"
        onChange={handleFileChange} 
        accept='image/*'
        />
      <button onClick={handleUploadImgBack}>Upload</button>
    </div>
  );
};

export default PlayerImgUpload;
