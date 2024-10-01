import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchGovernmentOfficials, approveGovernmentOfficial } from "../redux/actions/dashboardAction";
import "../styles/govtOfficials.css"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Empty from "../components/Empty";

const GovernmentOfficials = () => {
  const dispatch = useDispatch();
  const { governmentOfficials, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchGovernmentOfficials());
  }, [dispatch]);
  
  const handleApprove = (officialId) => {
    dispatch(approveGovernmentOfficial(officialId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container main-content government-officials">
          <h2 className="page-heading">Government Officials</h2>
          {governmentOfficials.length > 0 ? (
            <div className="officials-card-container">
              {governmentOfficials.map((official) => (
                <div key={official._id} className="official-card">
                  <h3>{official.name}</h3>
                  <p>Department: {official.department}</p>
                  <p>Status: {official.isApproved ? "Approved" : "Pending"}</p>
                  {!official.isApproved && (
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(official._id)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default GovernmentOfficials;