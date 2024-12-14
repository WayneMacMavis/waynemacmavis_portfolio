import React from 'react';
// import { useSpring, animated } from 'react-spring';
import SkillItem from './SkillItem'; // Import SkillItem component
import './Skills.css'

const SkillsPage = () => {
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 80 },
    { name: 'React', level: 75 },
    { name: 'JavaScript', level: 85 },
    { name: 'PHP', level: 30 },
    // Add more skills as needed
  ];

  return (
    <div id='skills' className="skills-page">
      <h2 className='skills-title'>Skills</h2>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;