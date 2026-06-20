"use client";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { IconArrowUp } from "@tabler/icons-react";

export default function BackToTop({ containerRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Show the button once the user scrolls past 300px (moving off the Hero section)
      if (containerRef.current.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const mainContainer = containerRef.current;
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  const scrollToTop = () => {
    if (!containerRef.current) return;

    // Smoothly glide your custom container back to the absolute top
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          // Frosted glass appearance that matches your "ABOUT ME" header styling perfectly!
          className="fixed bottom-8 right-6 md:right-10 z-9999 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-foreground backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.3)] dark:border-slate-700/30 dark:bg-slate-900/40 transition-all hover:scale-110 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] dark:hover:border-slate-500 dark:hover:shadow-[0_0_30px_rgba(150,150,150,0.8)]"
          aria-label="Scroll to top"
        >
          <IconArrowUp className="h-5 w-5 text-sky-500 dark:text-slate-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}