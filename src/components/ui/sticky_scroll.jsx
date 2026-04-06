"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion as Motion, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const cardLength = content.length;

  const progressMV = useMotionValue(0);
  const isAnimating = useRef(false);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef(null);

  const WHEEL_THRESHOLD = 200;

  useEffect(() => {
    const unsub = progressMV.on("change", (v) => {
      const idx = Math.round(v);
      setActiveCard(Math.max(0, Math.min(idx, cardLength - 1)));
    });
    return unsub;
  }, [progressMV, cardLength]);

  const goToCard = useCallback((idx) => {
    idx = Math.max(0, Math.min(idx, cardLength - 1));
    isAnimating.current = true;
    animate(progressMV, idx, {
      type: "spring",
      stiffness: 280,
      damping: 34,
      onComplete: () => { isAnimating.current = false; },
    });
  }, [progressMV, cardLength]);

  const handleWheel = useCallback((e) => {
    const currentCard = Math.round(progressMV.get());

    // 1. THE NATIVE ESCAPE HATCH: 
    // Are we at the top trying to scroll up? Or at the bottom trying to scroll down?
    const pushingUpAtTop = currentCard === 0 && e.deltaY < 0;
    const pushingDownAtBottom = currentCard === cardLength - 1 && e.deltaY > 0;

    if (!isAnimating.current && (pushingUpAtTop || pushingDownAtBottom)) {
      // DO NOTHING! We deliberately DO NOT call e.preventDefault().
      // This lets the mouse wheel event "escape" up to your <main> tag.
      // Your CSS snap-mandatory will natively catch it and glide perfectly without shivering!
      return;
    }

    // 2. Otherwise, we are navigating inside the cards. Trap the scroll!
    e.preventDefault();
    e.stopPropagation();

    if (isAnimating.current) return;

    wheelAccum.current += e.deltaY;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 150);

    if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;

    const direction = wheelAccum.current > 0 ? 1 : -1;
    wheelAccum.current = 0;

    const nextCard = currentCard + direction;
    if (nextCard >= 0 && nextCard < cardLength) {
      goToCard(nextCard);
    }
  }, [progressMV, cardLength, goToCard]);

  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // We bind the wheel event cleanly here
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Touch support (simplified to match the native escape hatch)
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 50) return;

    const direction = delta > 0 ? 1 : -1;
    const currentCard = Math.round(progressMV.get());

    const pushingUpAtTop = currentCard === 0 && direction < 0;
    const pushingDownAtBottom = currentCard === cardLength - 1 && direction > 0;

    // Let native touch scrolling handle exits
    if (pushingUpAtTop || pushingDownAtBottom) return;

    const nextCard = currentCard + direction;
    if (nextCard >= 0 && nextCard < cardLength) goToCard(nextCard);
  };

  const shadowColors = [
    "rgba(250, 204, 21, 0.7)",
    "rgba(56, 189, 248, 0.7)",
    "rgba(127, 0, 255, 0.7)",
    "rgba(74, 222, 128, 0.7)",
  ];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-full flex w-full justify-between rounded-md px-10 md:px-20 bg-transparent overflow-hidden"
    >
      {/* LEFT: Text cards */}
      <div className="relative flex items-start w-full lg:w-1/2 pr-8 md:pr-16 overflow-hidden">
        <div className="w-full h-full relative">
          {content.map((item, index) => {
            const diff = index - activeCard;
            return (
              <Motion.div
                key={item.title + index}
                animate={{
                  opacity: activeCard === index ? 1 : Math.max(0, 1 - Math.abs(diff) * 0.6),
                  y: diff * 80,
                  filter: activeCard === index ? "blur(0px)" : `blur(${Math.abs(diff) * 5}px)`,
                  scale: activeCard === index ? 1 : 0.94,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 34 }}
                className="absolute inset-0 flex flex-col justify-center py-32 max-w-2xl w-full"
                style={{ pointerEvents: activeCard === index ? "auto" : "none" }}
              >
                <h2 className="text-3xl font-bold text-foreground font-heading">
                  {item.title}
                </h2>

                <Motion.div
                  animate={{ filter: `drop-shadow(0px 0px 40px ${shadowColors[activeCard % shadowColors.length]})` }}
                  className="lg:hidden mt-8 mb-8 w-full flex justify-center"
                >
                  {item.content}
                </Motion.div>

                <div className="text-base mt-6 lg:mt-10 max-w-md text-foreground/80 font-body leading-relaxed">
                  {item.description}
                </div>

                <div className="flex gap-2 mt-8">
                  {content.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToCard(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        i === activeCard ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
                      )}
                      aria-label={`Go to ${content[i].title}`}
                    />
                  ))}
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Image panel */}
      <Motion.div
        animate={{ filter: `drop-shadow(0px 0px 60px ${shadowColors[activeCard % shadowColors.length]})` }}
        transition={{ duration: 0.6 }}
        className={cn("sticky top-0 hidden lg:flex lg:w-1/2 h-full items-center justify-center", contentClassName)}
      >
        {content.map((item, index) => (
          <Motion.div
            key={index}
            animate={{
              opacity: activeCard === index ? 1 : 0,
              scale: activeCard === index ? 1 : 0.9,
              filter: activeCard === index ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="absolute"
          >
            {item.content}
          </Motion.div>
        ))}
      </Motion.div>
    </div>
  );
};