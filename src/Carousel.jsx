import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import "./Carousel.css";

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  // Drag state
  const [startX, setStartX] = useState(null);

  // Handle dragging
  const handleDragStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    const endX = e.clientX || e.changedTouches[0].clientX;
    if (startX && endX) {
      const difference = startX - endX;
      if (difference > 50) {
        handleNext(); // Drag left to rotate right
      } else if (difference < -50) {
        handlePrevious(); // Drag right to rotate left
      }
    }
    setStartX(null);
  };

  // Handle navigation buttons
  const handleNext = () => {
    setGoToSlide((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setGoToSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div
      id="projects"
      className="portfolio-page"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="container"
        style={{
          width: props.width,
          height: props.height,
          margin: props.margin,
        }}
      >
        <button className="carousel-button left" onClick={handlePrevious}>
          &#9664;
        </button>
        <Carousel
          slides={cards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={showArrows}
          animationConfig={config.gentle}
        />
        <button className="carousel-button right" onClick={handleNext}>
          &#9654;
        </button>
      </div>
    </div>
  );
}
