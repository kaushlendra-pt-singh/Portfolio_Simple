"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion as Motion, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Must match the SECTION_IDS order and IDs in App.jsx.
const SECTION_IDS = ['home', 'about', 'projects', 'contact'];
const DESKTOP_MQ = '(min-width: 1024px)';

export const StickyScroll = ({ content, contentClassName, isDesktop: isDesktopProp }) => {
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

  // Track desktop state internally as well (for effects that need it)
  const [isDesktop, setIsDesktop] = useState(
    () => isDesktopProp ?? (typeof window !== 'undefined' && window.matchMedia(DESKTOP_MQ).matches)
  );

  useEffect(() => {
    if (isDesktopProp !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDesktop(isDesktopProp);
      return;
    }
    const mql = window.matchMedia(DESKTOP_MQ);
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [isDesktopProp]);

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

  // ── Mobile slide navigation ──────────────────────────────────────────────
  const goToPrev = useCallback(() => {
    if (activeCard > 0) goToCard(activeCard - 1);
  }, [activeCard, goToCard]);

  const goToNext = useCallback(() => {
    if (activeCard < cardLength - 1) goToCard(activeCard + 1);
  }, [activeCard, cardLength, goToCard]);

  // ── Desktop-only: Exit to another section ────────────────────────────────
  const exitToSection = useCallback((id) => {
    // Dispatch a custom event on <main> so App.jsx handles the actual scroll.
    // This ensures a single scroll controller (App.jsx) and no competing scrollTo calls.
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    lastExitTime.current = Date.now();
    isExiting.current = true;
    wheelAccum.current = 0;

    mainEl.dispatchEvent(new CustomEvent('scroll-to-section', {
      detail: { sectionId: id },
    }));

    // Hold the exit lock until the outer snap scroll fully settles.
    setTimeout(() => { isExiting.current = false; }, 2400);
  }, []);

  // ── Desktop-only: Wheel handler ──────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    // Always prevent default + stop propagation on desktop
    // This keeps the outer container deaf to wheel events while
    // the About section owns the scroll.
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

  // Only register wheel interception on desktop
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isDesktop) return;
    // capture:true → our handler runs in the capture phase (before bubbling),
    // so we intercept the event before it can reach App.jsx's bubble handler.
    el.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", handleWheel, { capture: true });
  }, [handleWheel, isDesktop]);

  // ── Touch support (desktop only) ─────────────────────────────────────────
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => {
    if (!isDesktop) return;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (!isDesktop) return;
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
      <div className="relative flex items-start w-full lg:w-1/2 pr-8 md:pr-16 overflow-hidden md:pl-10">
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
                <div className="flex gap-2 mt-8 items-center">
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

                {/* Mobile: Left/Right navigation buttons */}
                {!isDesktop && (
                  <div className="flex gap-4 mt-6 lg:hidden">
                    <button
                      onClick={goToPrev}
                      disabled={activeCard === 0}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer",
                        activeCard === 0
                          ? "border-foreground/15 text-foreground/20 cursor-not-allowed"
                          : "border-sky-500/50 dark:border-slate-400/50 text-sky-500 dark:text-slate-300 hover:bg-sky-500/10 dark:hover:bg-slate-300/10 hover:scale-110 active:scale-95 shadow-[0_0_12px_rgba(56,189,248,0.3)] dark:shadow-[0_0_12px_rgba(203,213,225,0.3)]"
                      )}
                      aria-label="Previous slide"
                    >
                      <IconChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={activeCard === cardLength - 1}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer",
                        activeCard === cardLength - 1
                          ? "border-foreground/15 text-foreground/20 cursor-not-allowed"
                          : "border-sky-500/50 dark:border-slate-400/50 text-sky-500 dark:text-slate-300 hover:bg-sky-500/10 dark:hover:bg-slate-300/10 hover:scale-110 active:scale-95 shadow-[0_0_12px_rgba(56,189,248,0.3)] dark:shadow-[0_0_12px_rgba(203,213,225,0.3)]"
                      )}
                      aria-label="Next slide"
                    >
                      <IconChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
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