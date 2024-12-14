import { useEffect } from 'react';
import debounce from 'lodash/debounce'; // Using lodash debounce utility

const ScrollToTop = () => {
  useEffect(() => {
    const sections = [
      { name: 'Home', percentage: 20 },
      { name: 'About', percentage: 40 },
      { name: 'Skills', percentage: 60 },
      { name: 'Projects', percentage: 100 },
    //   { name: 'Contact', percentage: 80 }
    ]; // Adjust the section names and their respective scroll positions as needed

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.clientHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / pageHeight) * 100;

      // Find the section closest to the current scroll position
      const currentSection = sections.reduce((prev, curr) =>
        Math.abs(curr.percentage - scrollPercentage) < Math.abs(prev.percentage - scrollPercentage) ? curr : prev
      );

      // Update the URL hash based on the current section
      window.history.replaceState(null, '', `#${currentSection.name}`);
    }, 100); // Adjust debounce delay as needed

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollToTop;