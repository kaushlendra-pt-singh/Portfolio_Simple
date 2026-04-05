"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion as Motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    // target:ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  // 1. Replaced background colors with your requested Shadow Glow colors!
  const shadowColors = [
    "rgba(250, 204, 21, 0.7)", // 1. Silver (slate-400)
    "rgba(56, 189, 248, 0.7)",  // 2. Sky Blue (sky-400)
    "rgba(251, 146, 60, 0.7)",  // 3. Orange (orange-400)
    "rgba(74, 222, 128, 0.7)",  // 4. Nature Green (green-400)
  ];

  return (
    // 2. Removed the animated backgroundColor and set it to bg-transparent
    <div
      className="relative h-full flex w-full justify-between overflow-y-auto rounded-md p-10 md:p-20 bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      ref={ref}>
      
      {/* LEFT SIDE: Text & Mobile Images */}
      <div className="relative flex items-start w-full lg:w-1/2 pr-8 md:pr-16">
        <div className="max-w-2xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <Motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                // 3. Changed text-slate-100 to text-foreground for Light/Dark mode support
                className="text-3xl font-bold text-foreground font-heading">
                {item.title}
              </Motion.h2>

              {/* Mobile Image (Also gets the shifting glow!) */}
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.3,
                  filter: `drop-shadow(0px 0px 40px ${shadowColors[activeCard % shadowColors.length]})`
                }}
                transition={{ duration: 0.5 }}
                className="lg:hidden mt-8 mb-8 w-full flex justify-center"
              >
                {item.content}
              </Motion.div>

              <Motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                // 4. Changed text-slate-300 to text-foreground/80
                className="text-lg mt-6 lg:mt-10 max-w-md text-foreground/80 font-body leading-relaxed">
                {item.description}
              </Motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      
      {/* --- RIGHT SIDE: The Image Container --- */}
      {/* 5. Animated the drop-shadow filter to create a massive glow around the image */}
      <Motion.div
        animate={{
          filter: `drop-shadow(0px 0px 60px ${shadowColors[activeCard % shadowColors.length]})`
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 hidden lg:flex lg:w-1/2 h-full items-center justify-center",
          contentClassName
        )}>
        {content[activeCard].content ?? null}
      </Motion.div>
      
    </div>
  );
};