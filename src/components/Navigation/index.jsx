import React, { useState, useEffect, useMemo } from 'react';
import Logo from '../../assets/images/logo.png';
import Scrollspy from 'react-scrollspy';
import { animated, Spring } from '@react-spring/web';
import VisibilitySensor from 'react-visibility-sensor';
import './style.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({
    home: false,
    about: false,
    skills: false,
    projects: false,
    contact: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 150);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAnimation = (id) => {
    setAnimatedItems(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  const menuItems = useMemo(() => ['home', 'about', 'skills', 'projects', 'contact'], []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <img src={Logo} alt='Logo' className="logo"></img>
      <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <ul onClick={handleMenuClick}>
          <Scrollspy
            items={menuItems}
            currentClassName="active" >
            {menuItems.map((item, index) => (
              <li key={item}>
                <VisibilitySensor onChange={() => handleAnimation(item)}>
                  <Spring
                    config={{ duration: 500 }}
                    delay={index * 100} // Adjust the delay as needed
                    to={{
                      opacity: animatedItems[item] ? 1 : 0,
                      transform: animatedItems[item] ? 'translateY(0)' : 'translateY(-50px)'
                    }}>
                    {style => (
                      <animated.a
                        href={`#${item}`}
                        style={{
                          ...style,
                          display: "block",
                          animationPlayState: animatedItems[item] ? 'paused' : 'running'
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </animated.a>
                    )}
                  </Spring>
                </VisibilitySensor>
              </li>
            ))}
          </Scrollspy>
        </ul>
      </div>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuClick}>
        <div className="menu-line" />
        <div className="menu-line" />
        <div className="menu-line" />
      </div>
    </nav>
  );
};

export default Navigation;

// Debounce function to optimize scroll event
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
