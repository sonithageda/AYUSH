import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
    role: "Stakeholder or other",
    mobile: "",
    userType: "public",
    governmentId: "",
    department: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFile(data.url.toString()));
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;
      if (file === "") return;


      const { name, email, password, confpassword, role, mobile, userType, governmentId, department } = formDetails;
      console.log(formDetails)
      if (!name  || !email || !password || !confpassword || !role || !mobile) {
        return toast.error("Input field should not be empty");
      } else if (name.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      if (role === 'government_official' && (!governmentId || !department)) {
        return toast.error("Government ID and Department are required for government officials");
      }
      
      await toast.promise(
        axios.post("/user/register", {
          name,
          email,
          password,
          pic: file,
          role,
          mobile,
        ...(role === 'Stakeholder or other' && { userType }),
        ...(role === 'government_official' && { governmentId, department }),
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form
          onSubmit={formSubmit}
          className="register-form"
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="tel"
            name="mobile"
            className="form-input"
            placeholder="Enter your mobile number"
            value={formDetails.mobile}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d{0,10}$/.test(value)) { 
                inputChange(e);
              }
            }}
            maxLength="10"
          />
          <select
            name="role"
            className="form-input"
            value={formDetails.role}
            onChange={inputChange}
          >
            <option value="Stakeholder or other">Stakeholder or Other</option>
            <option value="government_official">Government Official</option>
          </select>
          {formDetails.role === 'Stakeholder or other' && (
            <select
              name="userType"
              className="form-input"
              value={formDetails.userType}
              onChange={inputChange}
            >
              <option value="investor">Investor</option>
              <option value="incubator">Incubator</option>
              <option value="public">Public</option>
              <option value="other">Other</option>
            </select>
          )}
          {formDetails.role === 'government_official' && (
            <>
              <input
                type="text"
                name="governmentId"
                className="form-input"
                placeholder="Enter your Government ID / email ID"
                value={formDetails.governmentId}
                onChange={inputChange}
              />
              <input
                type="text"
                name="department"
                className="form-input"
                placeholder="Enter your Department"
                value={formDetails.department}
                onChange={inputChange}
              />
              <p className="warning">Please provide your government ID and department.</p>
            </>
          )}
          <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink
            className="login-link"
            to={"/login"}
          >
            Log in
          </NavLink>
        </p>
        <p>
          Register as a Startup?{" "}
          <NavLink className="login-link" to={"/startup-register"}>
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
