import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Img from './assets/images/profile.jpg';
import Card from './components/Card';
import './About.css';

const AboutPage = () => {
  const [isVisible, setVisibility] = useState(false);
  const [isImageVisible, setImageVisibility] = useState(false);
  const [isHeaderVisible, setHeaderVisibility] = useState(false);

  const onChange = visibility => {
    if (visibility && !isVisible) {
      setVisibility(true);
    }
  };

  const onImageChange = visibility => {
    if (visibility && !isImageVisible) {
      setImageVisibility(true);
    }
  };

  const onHeaderChange = visibility => {
    if (visibility && !isHeaderVisible) {
      setHeaderVisibility(true);
    }
  };

  const cardData = [
    {
      title: "Who am I?",
      content: "Greetings! I'm Wayne, a budding web developer with a deep passion for creating captivating online experiences. My journey in web development has been driven by an insatiable curiosity and a relentless desire to learn and grow in this dynamic field.",
      delay: 1,
    },
    {
      title: "Why Web Development?",
      content: "My fascination with web development stems from the ability to transform lines of code into functional, visually appealing websites that make a difference. It's not just about programming; it's about solving real-world problems and enhancing the digital landscape.",
      delay: 1.5,
    },
    {
      title: "My Motivation",
      content: "What motivates me as a web developer is the opportunity to contribute to the ever-evolving digital world. I thrive on challenges and believe in the power of technology to shape the future. I am eager to be part of a team where I can leverage my skills to create remarkable online solutions.",
      delay: 2,
    },
  ];

  return (
    <div id='about' className="about-container">
      <div className="about-content">
        <div className="about-image">
          <VisibilitySensor offset={{ top: 0 }} onChange={onImageChange}>
            <img
              src={Img}
              alt="Img"
              style={{
                transition: `opacity ${2}s ease`,
                opacity: isImageVisible ? 1 : 0,
                transitionDelay: '0.5s',
              }}
            />
          </VisibilitySensor>
        </div>
        <div className="about-text">
          <VisibilitySensor offset={{ top: 0 }} onChange={onHeaderChange}>
            <div
               style={{
                transition: `opacity ${1}s ease, transform ${1}s ease`,
                transitionDelay: `0.2s`,
                opacity: isHeaderVisible ? 1 : 0,
                transform: isHeaderVisible ? `translateY(0)` : `translateY(-10px)`, // Subtle shift
              }}
            >
              <div className="about-header">
                <h2>A little about me</h2>
              </div>
            </div>
          </VisibilitySensor>
          {cardData.map((card, index) => (
            <VisibilitySensor key={index} offset={{ top: 0 }} onChange={onChange}>
              <div
                style={{
                  transition: `opacity ${1}s ease, transform ${1}s ease`,
                  transitionDelay: `${card.delay}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? `translateY(${0}px)` : `translateX(${-100}px)`,
                }}
              >
                <Card title={card.title} content={card.content} />
              </div>
            </VisibilitySensor>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
