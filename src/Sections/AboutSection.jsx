import { motion as Motion } from "motion/react";
import { StickyScroll } from "../components/ui/sticky_scroll.jsx";
import LapMan from '../assets/man_on_laptop.jpg';
import MachinArch from '../assets/Coding_Blue.jpg';
import CodingLap from '../assets/My_Way_Better.jpg';
import GenericStand from '../assets/generic_stand_dark.jpg';

// ─── Micro-components ───────────────────────────────────────────────────────

/** Glowing keyword pill */
const Highlight = ({ children, color = "sky" }) => {
    const colorMap = {
        sky: "text-sky-400 bg-sky-400/10 border-sky-400/30",
        yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
        purple: "text-purple-400 bg-purple-400/10 border-purple-400/30",
        green: "text-green-400 bg-green-400/10 border-green-400/30",
    };
    return (
        <span className={`inline-block px-1.5 py-0.5 rounded border text-sm font-semibold tracking-wide font-mono mx-0.5 ${colorMap[color]}`}>
            {children}
        </span>
    );
};

/**
 * Tooltip — positions the bubble to the RIGHT of the trigger by default.
 * Pass align="left" to pin it left-aligned (prevents right-side clipping).
 * Pass align="center" for center (default, can clip on far-left items).
 */
const Tip = ({ children, tip, align = "right" }) => {
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
            <span className={`pointer-events-none absolute -top-10 ${posClass} whitespace-nowrap rounded-md bg-foreground/90 px-3 py-1.5 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg`}>
                {tip}
                <span className={`absolute top-full ${arrowClass} border-4 border-transparent border-t-foreground/90`} />
            </span>
        </span>
    );
};

/** Compact tag row */
const TagRow = ({ tags, color }) => (
    <div className="flex flex-wrap gap-1.5 mt-3">
        {tags.map((t) => <Highlight key={t} color={color}>{t}</Highlight>)}
    </div>
);

/** Minimal bullet list — each item is a ReactNode */
const BulletList = ({ items }) => (
    <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-foreground/75">
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
                <p className="text-base leading-relaxed text-foreground/80">
                    I'm a{" "}
                    <Tip tip="Building end-to-end: both frontend & backend systems" align="left">
                        Full Stack
                    </Tip>
                    {" & "}
                    <Tip tip="ML pipelines, LLM integration, Agentic AI & deep learning" align="left">
                        AI/ML Engineer
                    </Tip>
                    {" "}who thrives at the intersection of intelligent systems and immersive web design.
                </p>
                <p className="text-base leading-relaxed text-foreground/80 mt-3">
                    I turn complex data and ML architectures into clean, high-performance,
                    and beautifully interactive products.
                </p>
                <TagRow tags={["Full Stack", "AI / ML", "System Design"]} color="yellow" />
            </div>
        ),
        content: (
            <div>
                <img src={LapMan} alt="Professional" className="w-100 rounded-xl shadow-2xl object-cover" />
            </div>
        ),
    },
    {
        title: 'Present',
        description: (
            <div>
                <p className="text-base leading-relaxed text-foreground/80">
                    Bridging heavy backend logic with pixel-perfect frontends.
                </p>
                <BulletList items={[
                    <>Dynamic UIs with <Highlight color="sky">React</Highlight> & <Highlight color="sky">Next.js</Highlight></>,
                    <>Scalable backends in <Highlight color="green">Python</Highlight> & <Highlight color="green">Node.js</Highlight></>,
                    <>Integrating{" "}
                        <Tip tip="Large Language Models — GPT, Claude, Gemini and more" align="left">
                            LLMs
                        </Tip>
                        {" "}into real-world products
                    </>,
                    <>Active{" "}
                        <Tip tip="Contributing to open repos, filing PRs, reviewing issues" align="left">
                            open-source contributor
                        </Tip>
                    </>,
                ]} />
            </div>
        ),
        content: (
            <div>
                <img src={MachinArch} alt="Current work" className="w-100 rounded-xl shadow-2xl object-cover" />
            </div>
        ),
    },
    {
        title: 'My Way',
        description: (
            <div>
                <p className="text-base leading-relaxed text-foreground/80">
                    Great software shouldn't just <em>function</em> — it should feel <em>effortless</em>.
                    <br></br>My philosophy:
                </p>
                <BulletList items={[
                    "Clean, maintainable code above all else",
                    "Resilient infrastructure that never compromises UX",
                    // Fixed: no broken mid-sentence JSX split
                    <>
                        I obsess over every detail — whether it's a complex{" "}
                        <Highlight color="purple">API routing</Highlight>{" "}bug or the perfect{" "}
                        <Highlight color="purple">transition timing</Highlight>{" "}in the UI
                    </>,
                ]} />
            </div>
        ),
        content: (
            <div>
                <img src={CodingLap} alt="My approach" className="w-100 rounded-xl shadow-2xl object-cover" />
            </div>
        ),
    },
    {
        title: 'Beyond the Code',
        description: (
            <div>
                <p className="text-base leading-relaxed text-foreground/80">
                    When I'm not shipping features, you'll find me:
                </p>
                <BulletList items={[
                    <>Exploring high-fantasy{" "}
                        <Tip tip="My Fav: LOTR, GOT and Star Wars" align="left">
                            worlds & lore
                        </Tip>
                    </>,
                    "Catching up on cinematic universes",
                    <>Following the <Highlight color="green">Cricket</Highlight> season closely</>,
                    "Always hunting the next big challenge — in code and beyond",
                ]} />
            </div>
        ),
        content: (
            <div>
                <img src={GenericStand} alt="Beyond work" className="w-100 h-auto rounded-xl shadow-2xl object-cover" />
            </div>
        ),
    },
];

// ─── Section ─────────────────────────────────────────────────────────────────

export default function AboutSection() {
    return (
        <section className="relative h-screen w-full bg-background overflow-hidden">

            {/* StickyScroll fills the whole section */}
            <div className="absolute inset-0 z-0 px-4 py-4">
                <StickyScroll content={content} />
            </div>

            {/* Floating title */}
            <div className="absolute top-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <Motion.h1
                    initial={{ opacity: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                    className="pointer-events-auto shrink-0 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20 dark:bg-slate-900/20 dark:border-slate-700/30"
                >
                    <span className="bg-linear-to-br from-slate-800 to-slate-500 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-center text-3xl font-bold font-heading tracking-tight text-transparent md:text-4xl lg:text-5xl">
                        ABOUT ME
                    </span>
                </Motion.h1>
            </div>

            {/* Resume CTA */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <Motion.a
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
                >
                    Download Resume
                </Motion.a>
            </div>
        </section>
    );
}