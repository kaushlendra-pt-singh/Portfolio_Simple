"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion as Motion, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";

// Must match the SECTION_IDS order and IDs in App.jsx.
const SECTION_IDS = ['home', 'about', 'projects', 'contact'];

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const cardLength = content.length;

  const progressMV = useMotionValue(0);
  const isAnimating = useRef(false);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef(null);
  const lastExitTime = useRef(0);
  const isExiting = useRef(false); // hard-blocks ALL wheel events during outer nav

  const EXIT_COOLDOWN = 2200; // ms before we allow another outer-page exit
  const WHEEL_THRESHOLD = 200;  // accumulated deltaY needed to flip a card

  // Keep activeCard in sync with the spring value.
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

  const exitToSection = useCallback((id) => {
    // ── The root-cause fix for wobble ────────────────────────────────────
    //
    // Old approach: el.scrollIntoView({ behavior: "smooth" })
    //   → The browser smoothly scrolls the snap container toward the target,
    //     but snap-mandatory simultaneously fires its own "correction" scroll.
    //     Two competing animations = visible shake / wobble on neighboring sections.
    //
    // New approach: mainEl.scrollTo({ top: exactSnapPoint, behavior: "smooth" })
    //   → We scroll the snap container DIRECTLY to an exact snap point.
    //     snap-mandatory has nothing to "correct" because we're already landing
    //     on the snap point. Single animation, zero fighting, zero wobble.
    //
    const mainEl = document.querySelector('main');
    const idx = SECTION_IDS.indexOf(id);
    if (!mainEl || idx === -1) return;

    lastExitTime.current = Date.now();
    isExiting.current = true;
    wheelAccum.current = 0;

    mainEl.scrollTo({
      top: idx * mainEl.clientHeight,
      behavior: 'smooth',
    });

    // Hold the exit lock until the outer snap scroll fully settles.
    // App.jsx's own scroll lock (900 ms) also activates from its wheel handler,
    // but since StickyScroll owns the exit here, we need our own 2400 ms lock
    // to keep swallowing events from within the About section's div during the
    // transition (capture phase still routes those events to us, not to App).
    setTimeout(() => { isExiting.current = false; }, 2400);
  }, []);

  const handleWheel = useCallback((e) => {
    // ── Always prevent default + stop propagation ────────────────────────
    // This is what keeps the outer snap container deaf to wheel events while
    // the About section owns the scroll. Combined with { capture: true } below,
    // stopPropagation() kills the bubble phase so App.jsx's handler never fires.
    e.preventDefault();
    e.stopPropagation();

    if (isExiting.current) return; // hard block during outer nav animation
    if (isAnimating.current) return; // block during internal card spring

    wheelAccum.current += e.deltaY;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 150);

    if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;

    const direction = wheelAccum.current > 0 ? 1 : -1;
    wheelAccum.current = 0; // consume accumulated delta

    const currentCard = Math.round(progressMV.get());
    const nextCard = currentCard + direction;
    const canExit = Date.now() - lastExitTime.current > EXIT_COOLDOWN;

    if (nextCard >= cardLength && canExit) {
      exitToSection("projects");
    } else if (nextCard < 0 && canExit) {
      exitToSection("home");
    } else if (nextCard >= 0 && nextCard < cardLength) {
      goToCard(nextCard);
    }
  }, [progressMV, cardLength, goToCard, exitToSection]);

  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // capture:true → our handler runs in the capture phase (before bubbling),
    // so we intercept the event before it can reach App.jsx's bubble handler.
    el.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", handleWheel, { capture: true });
  }, [handleWheel]);

  // ── Touch support ────────────────────────────────────────────────────────
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    if (isExiting.current) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 50) return;
    const direction = delta > 0 ? 1 : -1;
    const currentCard = Math.round(progressMV.get());
    const nextCard = currentCard + direction;
    const canExit = Date.now() - lastExitTime.current > EXIT_COOLDOWN;
    if (nextCard >= cardLength && canExit) exitToSection("projects");
    else if (nextCard < 0 && canExit) exitToSection("home");
    else if (nextCard >= 0 && nextCard < cardLength) goToCard(nextCard);
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
      {/* LEFT: Stacked text cards animated by spring */}
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

                {/* Mobile: image inline between title and description */}
                <Motion.div
                  animate={{
                    filter: `drop-shadow(0px 0px 40px ${shadowColors[activeCard % shadowColors.length]})`,
                  }}
                  className="lg:hidden mt-8 mb-8 w-full flex justify-center"
                >
                  {item.content}
                </Motion.div>

                {/* Description accepts ReactNode */}
                <div className="text-base mt-6 lg:mt-10 max-w-md text-foreground/80 font-body leading-relaxed">
                  {item.description}
                </div>

                {/* Clickable dot indicators */}
                <div className="flex gap-2 mt-8">
                  {content.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToCard(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        i === activeCard
                          ? "w-6 bg-foreground"
                          : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
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

      {/* RIGHT: Sticky image panel with cross-fade */}
      <Motion.div
        animate={{
          filter: `drop-shadow(0px 0px 60px ${shadowColors[activeCard % shadowColors.length]})`,
        }}
        transition={{ duration: 0.6 }}
        className={cn(
          "sticky top-0 hidden lg:flex lg:w-1/2 h-full items-center justify-center",
          contentClassName
        )}
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