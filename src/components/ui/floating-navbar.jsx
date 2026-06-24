"use client";
import React, { useState } from "react";
import {
    // eslint-disable-next-line no-unused-vars
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { cn } from "../../lib/utils.js";

export const FloatingNav = ({
    navItems,
    className,
    containerRef
}) => {
    const { scrollY } = useScroll({ container: containerRef });
    const [visible, setVisible] = useState(false);
    const lastScrollY = React.useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY.current;

        // If we are at the very top (Hero section header is visible), hide the floating nav
        if (latest < 100) {
            setVisible(false);
        } else {
            // Past the header — show nav on scroll UP, hide on scroll DOWN
            if (latest < previous) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
        lastScrollY.current = latest;
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 0,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
                className={cn(
                    "flex max-w-fit fixed top-4 inset-x-0 mx-auto z-[5000] items-center justify-center",
                    className
                )}>
                <div
                    className="flex items-center justify-center gap-1 rounded-full border border-sky-300/50 bg-white/50 px-2 py-1.5 shadow-lg shadow-sky-500/10 backdrop-blur-xl dark:border-slate-600/40 dark:bg-slate-900/40 dark:shadow-slate-400/10"
                >
                    {navItems.map((navItem, idx) => (
                        <a
                            key={`link-${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-sky-100/70 hover:text-sky-600 active:scale-95 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
                            )}>
                            <span>{navItem.icon}</span>
                            <span className="hidden sm:block text-xs">{navItem.name}</span>
                        </a>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
