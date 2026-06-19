"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0, // Allows us to stagger items!
  direction = "up" // Can be "up", "down", "left", "right"
}) => {

  // Define starting positions based on direction
  const directions = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
  };

  return (
    <div style={{ width, position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: directions[direction],
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true, // Only animate once
          margin: "-50px" // Trigger slightly before it hits the center of the screen
        }}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.25, 0, 1] // A buttery-smooth custom easing curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};