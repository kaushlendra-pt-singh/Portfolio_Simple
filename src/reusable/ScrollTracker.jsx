// eslint-disable-next-line no-unused-vars
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function CustomProgressBar({ containerRef }) {
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 200, damping: 50 });

    const barHeight = useTransform(smoothScroll, [0, 1], ["0%", "100%"]);
    const tipOpacity = useTransform(smoothScroll, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            style={{
                height: barHeight,
            }}
            className="fixed top-0 right-2 md:right-5 w-0.5 md:w-0.7 z-[9999] origin-top bg-sky-500 dark:bg-slate-300 shadow-[0_0_12px_rgba(14,165,233,0.8)] dark:shadow-[0_0_12px_rgba(203,213,225,0.8)]"
        >
            {/* THE SOLID GLOWING TIP */}
            <motion.div
                style={{
                    opacity: tipOpacity,
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                
                /* 1. Increased size and perfect circle */
                w-2.5 h-2.5 rounded-full 
                
                /* LIGHT MODE: 
                   - Brighter solid base (sky-400)
                   - inset shadow (white highlight for shininess)
                   - intense outer glow */
                bg-sky-400 
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_0_20px_6px_rgba(14,165,233,0.9)] 
                
                /* DARK MODE: 
                   - Pure white solid base (stronger than slate-300)
                   - inset shadow (pure white glare)
                   - intense silver outer glow */
                dark:bg-white 
                dark:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_0_20px_6px_rgba(203,213,225,0.9)]"
            />
        </motion.div>
    );
}