import React from "react";
import CountUp from "react-countup";
import "../styles/homecircles.css";

const HomeCircles = () => {
  return (
    <>
    <section>
      <h2 className="page-heading">Assets of Ministry of Ayush</h2>
      <div className="container circles">
      <div className="circle">
        <CountUp
          start={0}
          end={12}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          National 
          <br />
          Institutions
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={5}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Research 
          <br />
          Organizations
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={1}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          PSU
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={1}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Subordinate
          <br />
          Offices
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={2}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Regulatory
          <br />
          Commisions
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={118}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          All Assets
        </span>
       </div>
      </div>
    </section>
    </>
  );
};

export default HomeCircles;
