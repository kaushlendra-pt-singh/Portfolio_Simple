"use client";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    // Check the browser memory on load
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // Toggle the theme
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-10 w-10 items-center justify-center rounded-full cursor-pointer border border-slate-200 bg-white/50 text-slate-800 backdrop-blur-sm transition-all hover:scale-110 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                initial={false}
                animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <IconMoon className="h-5 w-5" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <IconSun className="h-5 w-5" />
            </motion.div>
        </button>
    );
}