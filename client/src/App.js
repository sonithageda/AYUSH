import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Login from "./pages/Login";
import Register from "./pages/Register";

import StartupRegister from "./pages/StartupRegister";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin, GovernmentOfficial, Startup, ApprovalAuth } from "./middleware/route";
import React,{useEffect,lazy, Suspense } from "react";
import Loading from "./components/Loading";
import jwtDecode from "jwt-decode";
import { setUserInfo } from "./redux/reducers/authReducer";

const Home = lazy(() => import("./pages/Home"));
const StartupDashboard = lazy(() => import("./pages/StartupDashboard"));
const ApprovedStartups=lazy(()=>import("./pages/Startups"));
const StartupApplications = lazy(() => import("./pages/StartupApplications"));
const GovernmentOfficials = lazy(() => import("./pages/GovernmentOfficials"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log(user)
      dispatch(setUserInfo(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startups" element={<ApprovedStartups/>} />
        <Route path="/login" element={<Public><Login /></Public>} />
        <Route path="/register" element={<Public><Register /></Public>} />
        <Route path="/startup-register" element={<Public><StartupRegister /></Public>} />
        <Route path="/startup-dashboard" element={<Startup><StartupDashboard /></Startup>} />
          <Route path="/approved-startups" element={<ApprovedStartups />} />
          <Route path="/startup-applications" element={<ApprovalAuth><StartupApplications /></ApprovalAuth>} />
          <Route path="/government-officials" element={<Admin><GovernmentOfficials /></Admin>} />
          <Route path="*" element={<Error />}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
