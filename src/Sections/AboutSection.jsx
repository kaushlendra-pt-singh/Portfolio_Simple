import { useState, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { StickyScroll } from "../components/ui/sticky_scroll.jsx";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import LapMan from '../assets/man_on_laptop.jpg';
import MachinArch from '../assets/Coding_Blue.jpg';
import CodingLap from '../assets/My_Way_Better.jpg';
import GenericStand from '../assets/generic_stand_dark.jpg';

// ─── Micro-components ───────────────────────────────────────────────────────

/** Glowing keyword pill */
export const Highlight = ({ children, color = "sky" }) => {
    const colorMap = {
        sky: "text-sky-400 bg-sky-400/10 border-sky-400/30",
        yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
        purple: "text-purple-400 bg-purple-400/10 border-purple-400/30",
        green: "text-green-400 bg-green-400/10 border-green-400/30",
        red: "text-red-400 bg-red-400/10 border-red-400/30",
        indigo: "text-blue-400 bg-blue-400/10 border-blue-400/30"
    };
    return (
        <span className={`inline-block px-1.5 py-0.5 rounded border text-base font-semibold tracking-wide font-mono mx-0.5 ${colorMap[color]}`}>
            {children}
        </span>
    );
};

/**
 * Tooltip — positions the bubble to the RIGHT of the trigger by default.
 * Pass align="left" to pin it left-aligned (prevents right-side clipping).
 * Pass align="center" for center (default, can clip on far-left items).
 */
export const Tip = ({ children, tip, align = "right" }) => {
    const posClass = {
        center: "left-1/2 -translate-x-1/2",
        left: "left-0 translate-x-0",
        right: "right-0 translate-x-0",
    }[align];

    const arrowClass = {
        center: "left-1/2 -translate-x-1/2",
        left: "left-4",
        right: "right-4",
    }[align];

    return (
        <span className="relative group cursor-help inline-block">
            <span className="underline decoration-dotted decoration-foreground/40 underline-offset-2">
                {children}
            </span>
            <span className={`pointer-events-none absolute -top-10 ${posClass} whitespace-nowrap rounded-md bg-aboutForeground px-3 py-1.5 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg`}>
                {tip}
                <span className={`absolute top-full ${arrowClass} border-4 border-transparent border-t-aboutForeground`} />
            </span>
        </span>
    );
};

/** Compact tag row */
export const TagRow = ({ tags, color }) => (
    <div className="flex flex-wrap gap-1.5 mt-3">
        {tags.map((t) => <Highlight key={t} color={color}>{t}</Highlight>)}
    </div>
);

/** Minimal bullet list — each item is a ReactNode */
export const BulletList = ({ items }) => (
    <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-aboutForeground">
                <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

// ─── Content ────────────────────────────────────────────────────────────────

const content = [
    {
        title: 'Professional Me',
        description: (
            <div>
                <p className="text-base lg:text-lg leading-relaxed text-aboutForeground">
                    I'm a{" "}
                    <Tip tip="Building end-to-end: both frontend & backend systems" align="left">
                        Full Stack Web
                    </Tip>
                    {" & "}
                    <Tip tip="ML pipelines, LLM integration, Agentic AI & deep learning" align="left">
                        AI/ML Engineer
                    </Tip>
                    {" "}who believes that security, transparency, and strong principles should always come before code.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-aboutForeground mt-3">
                    I architect secure, scalable backend infrastructure and robust AI/ML pipelines, delivering them through clean, high-performance user interfaces.
                </p>
                <TagRow tags={["Full Stack Systems", "AI/ML Pipelines"]} color="yellow" />
            </div>
        ),
        image: LapMan,
    },
    {
        title: 'My Way',
        description: (
            <div>
                <p className="text-base lg:text-lg leading-relaxed text-aboutForeground">
                    Great software shouldn't just <em>function</em> — it should feel <em>effortless</em>.
                    <br></br>My philosophy:
                </p>
                <BulletList items={[
                    "Clean, maintainable code above all else.",
                    "Resilient and robust infrastructure that never compromises security and UX.",
                    <>
                        I obsess over every detail — whether it's a complex{" "}
                        <Highlight color="purple">API routing</Highlight>{" "}bug or the perfect{" "}
                        <Highlight color="purple">transition timing</Highlight>{" "}in the UI.
                    </>,
                ]} />
            </div>
        ),
        image: CodingLap,
    },
    {
        title: 'Present',
        description: (
            <div>
                <p className="text-base lg:text-lg leading-relaxed text-aboutForeground">
                    Writing scalable backends and AI/ML piplines. Also advancing in computer science fundamentals.
                </p>
                <BulletList items={[
                    <>Crafting <Highlight color="sky">dynamic UIs.</Highlight></>,
                    <>Engineering <Highlight color="green">scalable backends.</Highlight></>,
                    <>Integrating{" "}
                        <Tip tip="Large Language Models — GPT, Claude, Gemini and more" align="left">
                            LLMs
                        </Tip>
                        {" "}into intelligent products.
                    </>,
                    <>Driving impact as an active{" "}
                        <Tip tip="Contributing to open repos, filing PRs, reviewing issues" align="left">
                            open-source contributor
                        </Tip>
                    </>
                ]} />
            </div>
        ),
        image: MachinArch,
    },
    {
        title: 'Beyond the Code',
        description: (
            <div>
                <p className="text-base lg:text-lg leading-relaxed text-aboutForeground">
                    When I'm not shipping features, you'll find me:
                </p>
                <BulletList items={[
                    <>Exploring high-fantasy{" "}
                        <Tip tip="My Fav: LOTR, GOT and Star Wars" align="left">
                            worlds & lore
                        </Tip>
                    </>,
                    <>Catching up on{" "}<Tip tip="Like DC and Mistborn" align="left">
                        cinematic universes
                    </Tip>
                    </>,
                    <>Following the <Highlight color="green">Cricket</Highlight> seasons closely.</>,
                    "Always hunting the next big challenge — in code and beyond.",
                ]} />
            </div>
        ),
        image: GenericStand,
    },
];

// Build the `content` prop shape that StickyScroll expects (with .content as JSX)
const stickyScrollContent = content.map(item => ({
    ...item,
    content: (
        <div>
            <img src={item.image} alt={item.title} className="w-100 rounded-xl shadow-2xl object-cover" />
        </div>
    ),
}));

// ─── Mobile About — 3D Carousel ──────────────────────────────────────────────

// Variants for the 3D carousel-like page turn animation
const slideVariants = {
    enter: (direction) => ({
        rotateY: direction > 0 ? 45 : -45,
        x: direction > 0 ? '60%' : '-60%',
        opacity: 0,
        scale: 0.85,
    }),
    center: {
        rotateY: 0,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        rotateY: direction > 0 ? -45 : 45,
        x: direction > 0 ? '-60%' : '60%',
        opacity: 0,
        scale: 0.85,
    }),
};

function MobileAbout() {
    const [activeCard, setActiveCard] = useState(0);
    const [direction, setDirection] = useState(0);

    const goToPrev = useCallback(() => {
        if (activeCard > 0) {
            setDirection(-1);
            setActiveCard(prev => prev - 1);
        }
    }, [activeCard]);

    const goToNext = useCallback(() => {
        if (activeCard < content.length - 1) {
            setDirection(1);
            setActiveCard(prev => prev + 1);
        }
    }, [activeCard]);

    const item = content[activeCard];

    const shadowColors = [
        "rgba(250, 204, 21, 0.4)",
        "rgba(56, 189, 248, 0.4)",
        "rgba(127, 0, 255, 0.4)",
        "rgba(74, 222, 128, 0.4)",
    ];

    return (
        <section className="w-full bg-background px-4 py-8">
            {/* Title */}
            <Motion.h1
                initial={{ opacity: 0.5, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
                className="text-center mb-6"
            >
                <span className="bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 bg-clip-text text-3xl font-bold font-heading tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)]">
                    ABOUT ME
                </span>
            </Motion.h1>

            {/* Carousel container */}
            <div className="relative w-full min-h-550px flex items-start justify-center" style={{ perspective: '1200px' }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <Motion.div
                        key={activeCard}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                        }}
                        className="w-full rounded-2xl border border-slate-200/60 bg-white/50 dark:border-slate-700/40 dark:bg-slate-900/40 backdrop-blur-sm p-5 origin-center"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Card title */}
                        <h2 className="text-2xl font-bold text-foreground font-heading text-center mb-4">
                            {item.title}
                        </h2>

                        {/* Card image */}
                        <div className="w-full flex justify-center mb-5">
                            <div 
                                className="w-full max-w-xs aspect-4/3 rounded-xl overflow-hidden bg-foreground/5"
                                style={{ boxShadow: `0 8px 32px ${shadowColors[activeCard % shadowColors.length]}` }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Card description */}
                        <div className="text-sm leading-relaxed">
                            {item.description}
                        </div>
                    </Motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation: dots + arrows */}
            <div className="flex items-center justify-center gap-6 mt-6">
                {/* Left arrow */}
                <button
                    onClick={goToPrev}
                    disabled={activeCard === 0}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer
                        ${activeCard === 0
                            ? "border-foreground/15 text-foreground/20 cursor-not-allowed"
                            : "border-sky-500/50 dark:border-slate-400/50 text-sky-500 dark:text-slate-300 hover:bg-sky-500/10 dark:hover:bg-slate-300/10 active:scale-90 shadow-[0_0_12px_rgba(56,189,248,0.3)] dark:shadow-[0_0_12px_rgba(203,213,225,0.3)]"
                        }`}
                    aria-label="Previous slide"
                >
                    <IconChevronLeft className="h-5 w-5" />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2 items-center">
                    {content.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > activeCard ? 1 : -1);
                                setActiveCard(i);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                                ${i === activeCard
                                    ? "w-6 bg-sky-500 dark:bg-slate-300"
                                    : "w-2 bg-foreground/30 hover:bg-foreground/60"
                                }`}
                            aria-label={`Go to ${content[i].title}`}
                        />
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={goToNext}
                    disabled={activeCard === content.length - 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer
                        ${activeCard === content.length - 1
                            ? "border-foreground/15 text-foreground/20 cursor-not-allowed"
                            : "border-sky-500/50 dark:border-slate-400/50 text-sky-500 dark:text-slate-300 hover:bg-sky-500/10 dark:hover:bg-slate-300/10 active:scale-90 shadow-[0_0_12px_rgba(56,189,248,0.3)] dark:shadow-[0_0_12px_rgba(203,213,225,0.3)]"
                        }`}
                    aria-label="Next slide"
                >
                    <IconChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* CTA button */}
            <div className="flex justify-center mt-8">
                <Motion.a
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    href="/Kaushalendra_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] dark:bg-slate-200/90 dark:text-slate-900 dark:shadow-[0_0_20px_rgba(203,213,225,0.4)] dark:hover:bg-slate-200 dark:hover:shadow-[0_0_30px_rgba(203,213,225,0.6)]"
                >
                    View Resume
                </Motion.a>
            </div>
        </section>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function AboutSection({ isDesktop }) {
    if (!isDesktop) {
        return <MobileAbout />;
    }

    // Desktop: existing StickyScroll layout — unchanged
    return (
        <section className="relative h-screen w-full bg-background overflow-hidden">

            {/* StickyScroll fills the whole section */}
            <div className="absolute inset-0 z-0 px-4 py-4">
                <StickyScroll content={stickyScrollContent} isDesktop={isDesktop} />
            </div>

            {/* Floating title */}
            <div className="absolute top-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <Motion.h1
                    initial={{ opacity: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                    className="pointer-events-auto shrink-0 rounded-full px-4 py-2 backdrop-blur-sm"
                >
                    <span className="bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 bg-clip-text text-center text-3xl font-bold font-heading tracking-tight text-transparent md:text-4xl lg:text-5xl drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)]">
                        ABOUT ME
                    </span>
                </Motion.h1>
            </div>

            {/* Resume CTA */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex gap-15 justify-center pointer-events-none">
                <Motion.a
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    href="/Kaushalendra_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] dark:bg-slate-200/90 dark:text-slate-900 dark:shadow-[0_0_20px_rgba(203,213,225,0.4)] dark:hover:bg-slate-200 dark:hover:shadow-[0_0_30px_rgba(203,213,225,0.6)]"
                >
                    View Resume
                </Motion.a>
            </div>
        </section>
    );
}