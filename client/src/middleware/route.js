import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const Admin = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const GovernmentOfficial = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.role === 'government_official' && user.isApproved) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
};

export const Startup = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.role === 'startup') {
    return children;
  }
  return <Navigate to="/" replace={true} />;
};

export const ApprovalAuth = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));
  if (user.isAdmin || (user.role === 'government_official' && user.isApproved)) {
    console.log(user)
    return children;
  }
  return <Navigate to="/" replace={true} />;
};