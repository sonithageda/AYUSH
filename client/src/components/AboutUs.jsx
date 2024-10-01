import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container" id="about">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="AYUSH"
            />
          </div>
          <div className="hero-content">
            <p>
            The Ministry of Ayush was formed on the 9th of November 2014 with a vision of reviving the profound knowledge of our ancient systems of medicine and ensuring the optimal development and propagation of the Ayush systems of healthcare. Earlier, the Department of Indian System of Medicine and Homoeopathy (ISM&H) formed in 1995, was responsible for the development of these systems. It was then renamed as the Department of Ayurveda, Yoga, and Naturopathy, Unani, Siddha and Homoeopathy (Ayush) in November 2003 with focused attention towards education and research in Ayurveda, Yoga and Naturopathy, Unani, Siddha, and Homoeopathy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
