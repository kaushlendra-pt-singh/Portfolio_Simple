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

        // If we are at the very top (Hero section), hide the floating nav
        if (latest < 100) {
            setVisible(false);
        } else {
            // If scrolling UP, show the nav. If scrolling DOWN, hide it.
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
                    opacity: 0,//may be one
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
                    "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-5000 items-center justify-center",
                    className
                )}>
                <div
                    className="flex items-center justify-center gap-2 rounded-full border border-sky-300/80 bg-white/65 px-2 py-1.5 shadow-md shadow-black/10 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/60">
                    {/* Nav items container */}
                    <div className="flex items-center gap-1">
                        {navItems.map((navItem, idx) => (
                            <a
                                key={`link-${idx}`}
                                href={navItem.link}
                                className={cn(
                                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-sky-500/80 hover:text-foreground dark:hover:bg-slate-800"
                                )}>
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block">{navItem.name}</span>
                            </a>
                        ))}
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};
