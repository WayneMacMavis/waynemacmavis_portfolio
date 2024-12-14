import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";
import VisibilitySensor from "react-visibility-sensor";
import Styles from "./Card.module.css";

function Card({ imagen }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });

  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <animated.div
          className={`${Styles.card} ${isVisible ? Styles.visible : ""}`}
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <img src={imagen} alt="" />
          <h2>Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
            erat volutpat.
          </p>
          <div className={Styles.btnn}>
            <Button text="Demo" />
            <Button text="Code" />
          </div>
        </animated.div>
      )}
    </VisibilitySensor>
  );
}

export default Card;
