import React, { useState } from 'react';
import s3 from '../../aws/config.js';
import { v4 as uuidv4 } from 'uuid';

const PlayerImgUpload = ({ playerId}) => {
  
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const params = {
      Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.name}`,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessage(`File uploaded successfully. File URL: ${data.Location}`);
      setImageUrl(data.Location);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
      {imageUrl && <img style={{ maxWidth: '50px' }} src={imageUrl} alt="uploaded" />}
    </div>
  );
};

export default PlayerImgUpload;
