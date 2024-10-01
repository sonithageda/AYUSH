import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Timeline from "../components/Timeline";
import DocumentUpload from "./DocumentUpload";
import { fetchStartupDashboard, updateStartupProfile } from '../redux/actions/startupAction';
import Loading from '../components/Loading';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/startupDashboard.css';

const StartupDashboard = () => {
  const dispatch = useDispatch();
  const { startupDetails, loading, error} = useSelector((state) => state.startup);
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    dispatch(fetchStartupDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (startupDetails) {
      setDescription(startupDetails.businessDescription || '');
      setDocuments(startupDetails.documents || []);
    }
  }, [startupDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStartupProfile({ businessDescription: description, documents }));
  };

  const handleFileUpload = (e) => {
    // Implement file upload logic here
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar />
    <div className="startup-dashboard">
      <h1>Startup Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Business Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="documents">Upload Documents</label>
          <input type="file" id="documents" onChange={handleFileUpload} multiple />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <Timeline status={startupDetails?.applicationStatus} />
    </div>
    <Footer />
    </>
  );
};

export default StartupDashboard;

