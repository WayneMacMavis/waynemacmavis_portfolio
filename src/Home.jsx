import React, { useState } from 'react';
import './Home.css';
import VisibilitySensor from 'react-visibility-sensor';
import Video from './assets/videos/home-bg.mp4';
import Placeholder from './assets/images/placeholder.jpg';

const HomeVid = ({ children }) => {
  const [isVisible, setVisibility] = useState(false);

  const handleVisibilityChange = visibility => {
    setVisibility(visibility);
  };

  const commonTransitionStyles = {
    transition: `opacity 1s ease, transform 1s ease`,
  };

  return (
    <div id="home" className="home-page">
      <video className="gin-bg" preload='auto' width="auto" height="auto" autoPlay loop muted poster={Placeholder}>
        <source src={Video} type="video/mp4" />
      </video>
      <div className="text">
        <VisibilitySensor offset={{ top: 0 }} onChange={handleVisibilityChange}>
          <h1
            style={{
              ...commonTransitionStyles,
              transitionDelay: `${1}s`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? `translateY(0)` : `translateX(-100px)`,
            }}
          >
            Hello, I'm <div className="name-color">Wayne Mac Mavis</div>
          </h1>
        </VisibilitySensor>

        <VisibilitySensor
          partialVisibility
          offset={{ top: 0 }}
          onChange={handleVisibilityChange}
        >
          <h2
            style={{
              ...commonTransitionStyles,
              transitionDelay: `${2.3}s`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? `translateY(0)` : `translateX(100px)`,
            }}
          >
            Web Developer
          </h2>
        </VisibilitySensor>
      </div>
    </div>
  );
};

export default HomeVid;
