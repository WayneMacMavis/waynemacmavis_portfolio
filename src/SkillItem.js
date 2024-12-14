import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaHtml5, FaCss3, FaReact, FaJs, FaPhp } from 'react-icons/fa';


const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'html':
      return <FaHtml5 style={{ color: '#e34c26' }} />;
    case 'css':
      return <FaCss3 style={{ color: '#1572b6'}} />;
    case 'react':
      return <FaReact style={{ color: '#61dafb' }} />;
    case 'javascript':
      return <FaJs style={{ color: '#f0db4f' }} />;
      case 'php':
        return <FaPhp style={{ color: '#FFFFFF' }} />;
    default:
      return null;
  }
};

const SkillItem = ({ skill }) => {
  const { name, level } = skill;
  const [ref, inView] = useInView({ triggerOnce: true });
  const [animatedProps, set] = useSpring(() => ({ width: '0%', config: { duration: 1300, } }));

  if (inView) {
    set({ width: `${level}%` });
  }

  return (
    <div className="skill-item" ref={ref}>
      <div className="icon-container">{getIcon(name)}</div>
      <div className="skill-details">
        <div className="skill-name">{name}</div>
        <div className="progress-bar-container">
          <animated.div className="progress-bar" style={animatedProps}></animated.div>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;