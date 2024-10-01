import React from 'react';
import '../styles/timeline.css';

const Timeline = ({ status }) => {
  const steps = ['Document Upload Pending', 'under_review', 'approved', 'rejected'];
  const currentStep = steps.indexOf(status);

  return (
    <div className="timeline">
      <h2>Application Status</h2>
      <div className="timeline-steps">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`timeline-step ${index <= currentStep ? 'active' : ''}`}
          >
            <div className="step-indicator"></div>
            <div className="step-label">{step.replace('_', ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;