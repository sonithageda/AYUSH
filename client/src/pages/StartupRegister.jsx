import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/register.css";

function StartupRegister() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
    ayushCategory: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, confpassword, ayushCategory } = formDetails;
      if (!name || !email || !password || !confpassword  || !ayushCategory) {
        return toast.error("All fields are required");
      }
      if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      await toast.promise(
        axios.post("/user/register", {
          name,
          email,
          password,
          ayushCategory,
          role: "startup"
        }),
        {
          pending: "Registering startup...",
          success: "Startup registered successfully",
          error: "Unable to register startup",
        }
      );
      navigate("/startup-dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Startup Registration</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter name of your Startup"
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
          <select
            name="ayushCategory"
            className="form-input"
            value={formDetails.ayushCategory}
            onChange={inputChange}
          >
            <option value="">Select AYUSH Category</option>
            <option value="Ayurveda">Ayurveda</option>
            <option value="Yoga">Yoga</option>
            <option value="Naturopathy">Naturopathy</option>
            <option value="Unani">Unani</option>
            <option value="Siddha">Siddha</option>
            <option value="Homoeopathy">Homoeopathy</option>
          </select>
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
          <button type="submit" className="btn form-btn">
            Register Startup
          </button>
        </form>
      </div>
    </section>
  );
}

export default StartupRegister;