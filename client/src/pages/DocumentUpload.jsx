import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DocumentUpload({ startupId, onUploadComplete }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      return toast.error("Please select files to upload");
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      await toast.promise(
        axios.post(`/startup/${startupId}/upload-documents`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading documents...",
          success: "Documents uploaded successfully",
          error: "Failed to upload documents",
        }
      );
      setFiles([]);
      onUploadComplete();
    } catch (error) {
      console.error("Error uploading documents:", error);
    }
  };

  return (
    <div className="document-upload">
      <h3>Upload Documents</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default DocumentUpload;