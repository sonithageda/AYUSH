import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadDocument } from "../redux/actions/startupActions";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadDocument(file));
    }
  };

  return (
    <div className="document-upload">
      <h2>Upload Documents</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;