"use client";
import { cn } from "@/lib/utils";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-1 group", containerClassName)}>
      {/* 1. BLURRED GLOW LAYER */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1 opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          // The original Aceternity Light Mode colors
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
          // THE NEW CHROME AURA: Pure whites and bright silvers blending together
          "dark:bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_0,#e2e8f0,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#f8fafc,transparent),radial-gradient(circle_farthest-side_at_0_0,#cbd5e1,#0a0a0a)]"
        )}
      />
      
      {/* 2. SOLID BORDER LAYER */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1 will-change-transform",
          // The original Aceternity Light Mode colors
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
          // ADDED: The Dark Mode Bright Silver alternate colors
          "dark:bg-[radial-gradient(circle_farthest-side_at_0_100%,#cbd5e1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#f8fafc,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#94a3b8,transparent),radial-gradient(circle_farthest-side_at_0_0,#e2e8f0,#0a0a0a)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};