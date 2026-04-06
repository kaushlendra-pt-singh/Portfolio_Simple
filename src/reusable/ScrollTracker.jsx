// eslint-disable-next-line no-unused-vars
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function CustomProgressBar({ containerRef }) {
    // 1. The correct Framer Motion syntax: passing an object
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // 2. Physics for that buttery smooth "catch up" effect
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 200, damping: 50 });

    // 3. Since it's vertical, we animate HEIGHT instead of width
    const barHeight = useTransform(smoothScroll, [0, 1], ["0%", "100%"]);

    return (
        <motion.div
            style={{
                height: barHeight,
            }}
            // 4. Positioned on the right, with your specific Light/Dark mode colors and a subtle glow!
            className="fixed top-0 right-2 md:right-5 w-0.5 md:w-0.7 z-9999 origin-top bg-sky-500 dark:bg-slate-300 shadow-[0_0_12px_rgba(14,165,233,0.8)] dark:shadow-[0_0_12px_rgba(203,213,225,0.8)]"
        />
    );
}