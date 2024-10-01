import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStartupApplications,approveStartup, rejectStartup } from "../redux/actions/dashboardAction";
import "../styles/startupApplications.css"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const StartupApplications = () => {
  const dispatch = useDispatch();
  const { applications, loading } = useSelector((state) => state.dashboard);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectingStartupId, setRejectingStartupId] = useState(null);

  useEffect(() => {
    dispatch(fetchStartupApplications());
  }, [dispatch]);

  const handleApprove = (startupId) => {
    dispatch(approveStartup(startupId));
  };

  const handleReject = (startupId) => {
    setRejectingStartupId(startupId);
  };

  const confirmReject = () => {
    if (rejectionReason.trim()) {
      dispatch(rejectStartup(rejectingStartupId, rejectionReason));
      setRejectionReason("");
      setRejectingStartupId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container main-content startup-applications">
      <h2 className="page-heading">Startup Applications</h2>
      {applications.length > 0 ? (
         <div className="applications-card-container">
              {applications.map((application) => (
        <div key={application._id} className="application-card">
          <h3>{application.name}</h3>
          <p>Category: {application.ayushCategory}</p>
          <p>Status: {application.applicationStatus}</p>
          {application.applicationStatus === 'pending' && (
            <div className="application-actions">
              <button className="approve-btn" onClick={() => handleApprove(application._id)}>Approve</button>
              <button className="reject-btn" onClick={() => handleReject(application._id)}>Reject</button>
            </div>
          )}
        </div>
      ))} </div>
    ) : (
      <Empty />
    )}
  
      {rejectingStartupId && (
        <div className="rejection-modal">
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection"
          />
          <button onClick={confirmReject}>Confirm Rejection</button>
          <button onClick={() => setRejectingStartupId(null)}>Cancel</button>
        </div>
      )}
    </section>
      )}
      <Footer />
    </>
  );
};

export default StartupApplications;