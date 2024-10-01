import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import image from "../images/ayush-logo.png";


const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutFunc = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>
          <img
              src={image}
              alt="A Y U S H"
              style={{ width: '312px', height: '60px' }}
            />
          </NavLink>
        </h2>
        <ul className="nav-links">
          <li>
              <HashLink to={"/#about"}>About Us</HashLink>
          </li>
          <NavLink to="/startups">Startups</NavLink>
          {userInfo && (userInfo.isAdmin || userInfo.role === 'government_official') && (
            <NavLink to="/startup-applications">Startup Applications</NavLink>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavLink to="/government-officials">Government Officials</NavLink>
          )}
          {userInfo && userInfo.role === 'startup' && (
            <NavLink to="/startup-dashboard">Startup Dashboard</NavLink>
          )}
          {!userInfo ? (
            <>
              <li>
                <NavLink className="btn" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/register"}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
