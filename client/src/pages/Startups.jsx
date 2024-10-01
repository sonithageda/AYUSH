// src/pages/Startups.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApprovedStartups } from "../redux/actions/startupAction";
import StartupCard from '../components/StartupCard';
import '../styles/startups.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";


const Startups = () => {
  const dispatch = useDispatch();
  const { startups, loading,error } = useSelector((state) => state.startup);

  useEffect(() => {
    dispatch(fetchApprovedStartups());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar />
    <div className="startups-container">
    <h1>Startups affliliated with AYUSH</h1>
    {startups.length > 0 ? (
      <div className="startups-grid">
        {startups.map((startup) => (
          <StartupCard key={startup._id} startup={startup} />
        ))}
      </div>
    ) : (
      <Empty message="No approved startups found" />
    )}
  </div>
  <Footer/>
  </>
);;
};

export default Startups;