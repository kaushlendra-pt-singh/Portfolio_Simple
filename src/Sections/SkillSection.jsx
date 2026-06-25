import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { HoverEffect } from '../components/ui/card-hover-effect.jsx';
import { Highlight } from './AboutSection.jsx';
// 1. Add IconCoffee here
import { 
    IconBrain, IconBrandAws, IconCloud, IconCode, 
    IconDatabase, IconLayout, IconServer, IconBrandAzure, 
    IconSchema, IconCpu
} from '@tabler/icons-react';

// 2. REMOVE siJava from this list
import {
    siCss, siExpress, siFastapi, siFirebase, siFramer, 
    siGit, siGithub, siGooglegemini, siGooglecloud, siHtml5, 
    siJavascript, siMongodb, siNetlify, siNextdotjs, siNodedotjs, 
    siPython, siReact, siRedis, siRender, siTailwindcss, 
    siVercel, siCplusplus, siLangchain
} from 'simple-icons';

// Manually added Mistral Grid Component
export const IconMistral = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M2 2h4v4H2zm6 0h4v4H8zm6 0h4v4h-4zm0 6h4v4h-4zm-6 6h4v4H8zm-6 0h4v4H2zm12 0h4v4h-4zm6-6h4v4h-4z"/>
  </svg>
);

// Custom Java Icon with Light/Dark Mode Tuning
export const IconJava = (props) => (
  <svg viewBox="0 0 48 48" width="24" height="24" fill="currentColor" {...props}>
    <g id="Java-Icon">
      <path className="fill-[#E76F51] dark:fill-[#FF8A65]" d="M22,6 C21,10 24,12 23,16 C22,19 19,19 20,23 C21,25 22,25 21,27 C20,28 19,28 19,29 C20,29 22,28 23,26 C24,24 23,23 24,20 C25,16 27,15 25,10 C24,7 23,7 22,6 Z" />
      <path className="fill-[#E76F51] dark:fill-[#FF8A65]" d="M27,4 C26,8 29,10 28,14 C27,17 24,17 25,21 C26,23 27,23 26,25 C25,26 24,26 24,27 C25,27 27,26 28,24 C29,22 28,21 29,18 C30,14 32,13 30,8 C29,5 28,5 27,4 Z" />
      <path className="fill-[#007396] dark:fill-[#14B8A6]" d="M34,26 C34,23 33,22 30,22 L14,22 C13,22 12,23 12,24 L13,32 C14,36 18,39 23,39 L25,39 C29,39 32,36 33,32 L34,26 Z M32,31 C31.5,34.5 28.5,37 24,37 L23,37 C19.5,37 16.5,34.5 16,31 L15.2,24 L32.8,24 L32,31 Z" />
      <path className="fill-[#005670] dark:fill-[#0D9488]" d="M16,31 C16.5,34.5 19.5,37 23,37 L24,37 C28.5,37 31.5,34.5 32,31 L32.8,24 L29,24 L28,31 C27.5,33.5 25.5,35 23,35 L22,35 C19.5,35 17.5,33.5 17,31 L16,31 Z" />
      <path className="fill-[#007396] dark:fill-[#14B8A6]" d="M34,25 C37,25 39,26 39,29 C39,32 37,34 34,34 L33,34 L33.5,32 L34,32 C36,32 37,31 37,29 C37,27 36,27 34,27 L33.8,27 L34,25 Z" />
      <path className="fill-[#333333] dark:fill-[#E2E8F0]" d="M10,40 C10,39 12,38 15,38 L31,38 C34,38 36,39 36,40 C36,41 33,43 23,43 C13,43 10,41 10,40 Z" />
    </g>
  </svg>
);


const SkillCardContent = ({ title, defaultIcon: DefaultIcon, descriptionSections, isDesktop }) => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const shouldAnimate = isDesktop !== undefined ? isDesktop : (typeof window !== 'undefined' && window.innerWidth >= 1024);

    // FIXED: Ensure black/white icons (Next.js, Vercel, GitHub) use currentColor for dark/light mode visibility
    const getIconColor = (hex) => {
        if (!hex) return 'currentColor';
        const h = hex.toLowerCase();
        if (h === '000000' || h === '111111' || h === 'ffffff') return 'currentColor';
        return `#${hex}`;
    };

    return (
        <div className="flex flex-col h-full z-20">
            {/* COMPRESSED: Reduced mb-3 to mb-2, gap-2 to gap-1.5 */}
            <div className="flex items-center gap-1.5 mb-2 relative">
                <div className="w-6 h-6 flex items-center justify-center">
                    {hoveredIcon && shouldAnimate ? (
                        <motion.div
                            key={hoveredIcon.title || hoveredIcon.name || 'hovered-icon'}
                            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            // FIXED: text-slate-900 dark:text-white added so 'currentColor' works perfectly in light/dark mode
                            className="w-full h-full text-slate-900 dark:text-white drop-shadow-[0_0_8px_currentColor]"
                            style={{ color: getIconColor(hoveredIcon.hex) }}
                        >
                            {hoveredIcon.path ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d={hoveredIcon.path} />
                                </svg>
                            ) : (
                                React.isValidElement(hoveredIcon) 
                                    ? React.cloneElement(hoveredIcon, { className: "w-full h-full" }) 
                                    : (() => {
                                        const HoveredComponent = hoveredIcon;
                                        return <HoveredComponent className="w-full h-full" />;
                                    })()
                            )}
                        </motion.div>
                    ) : (
                        React.isValidElement(DefaultIcon)
                            ? React.cloneElement(DefaultIcon, { className: "w-6 h-6 text-sky-500 dark:text-sky-400" })
                            : <DefaultIcon className="w-6 h-6 text-sky-500 dark:text-sky-400" />
                    )}
                </div>
                {/* LIGHT MODE TUNED: Added text-slate-800 */}
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-zinc-100 font-heading leading-tight">{title}</h3>
            </div>

            {/* COMPRESSED & LIGHT MODE TUNED: Reduced space-y-3 to space-y-2 */}
            <div className="flex-1 text-slate-600 dark:text-zinc-400 tracking-wide text-[11px] md:text-xs space-y-2 mt-1">
                {descriptionSections.map((section, idx) => (
                    <div key={idx}>
                        {/* LIGHT MODE TUNED: Added text-slate-700 */}
                        <div className="text-slate-700 dark:text-zinc-300 font-semibold mb-0.5 leading-tight">{section.label}</div>
                        {/* COMPRESSED: Reduced gap */}
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {section.items.map((item, i) => (
                                item.icon ? (
                                    <span
                                        key={i}
                                        onMouseEnter={() => {
                                            if (shouldAnimate) setHoveredIcon(item.icon);
                                        }}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                        // FIXED: Changed to cursor-help (question mark) for interactive items only
                                        className={shouldAnimate ? "cursor-help" : ""}
                                    >
                                        <Highlight color={item.color}>{item.text}</Highlight>
                                    </span>
                                ) : (
                                    // FIXED: Removed all cursor styling from non-interactive items
                                    <Highlight key={i} color={item.color || "sky"}>{item.text}</Highlight>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const skillItems = [
    {
        title: "AI, ML & Agentic Systems",
        defaultIcon: IconBrain,
        descriptionSections: [
            {
                label: "Frameworks",
                items: [
                    { text: "LangGraph", color: "sky", icon: IconSchema }, // Fixed
                    { text: "LangChain", color: "green", icon: siLangchain }, // Fixed
                ]
            },
            {
                label: "LLM Providers",
                items: [
                    { text: "Groq", color: "yellow", icon: IconCpu }, // Fixed
                    { text: "Gemini", color: "sky", icon: siGooglegemini }, // Fixed
                    { text: "Mistral", color: "purple", icon: IconMistral }
                ]
            },
            {
                label: "Specialties",
                items: [
                    { text: "Agentic AI", color: "indigo" },
                    { text: "NLP Sentiment Analysis", color: "sky" }
                    // Removed Prompt Engineering
                ]
            },
            {
                label: "Vision/Audio",
                items: [
                    { text: "Google Cloud Vision", color: "red", icon: siGooglecloud }
                ]
            }
        ]
    },
    {
        title: "Backend & Architecture",
        defaultIcon: IconServer,
        descriptionSections: [
            {
                label: "Languages",
                items: [
                    { text: "Python", color: "yellow", icon: siPython },
                    { text: "Node.js", color: "green", icon: siNodedotjs },
                ]
            },
            {
                label: "Frameworks",
                items: [
                    { text: "FastAPI", color: "sky", icon: siFastapi },
                    { text: "Express", color: "purple", icon: siExpress }, // Fixed icon mapping
                ]
            },
            {
                label: "Concepts",
                items: [
                    { text: "RESTful APIs", color: "indigo" },
                    { text: "Complex Routing", color: "sky" },
                    { text: "JWT Auth", color: "red" }, // Shortened for space
                    { text: "Microservices", color: "yellow" }
                ]
            }
        ]
    },
    {
        title: "Databases & Caching",
        defaultIcon: IconDatabase,
        descriptionSections: [
            {
                label: "NoSQL",
                items: [
                    { text: "MongoDB", color: "green", icon: siMongodb },
                    { text: "Firebase", color: "yellow", icon: siFirebase }
                ]
            },
            {
                label: "Caching/In-Memory",
                items: [
                    { text: "Redis", color: "red", icon: siRedis }
                ]
            },
            {
                label: "Concepts",
                items: [
                    { text: "DBMS", color: "sky" },
                    { text: "High-Speed Retrieval", color: "purple" }
                ]
            }
        ]
    },
    {
        title: "Frontend & UI Engineering",
        defaultIcon: IconLayout,
        descriptionSections: [
            {
                label: "Core",
                items: [
                    { text: "JavaScript", color: "yellow", icon: siJavascript },
                    { text: "HTML5", color: "red", icon: siHtml5 },
                    { text: "CSS3", color: "sky", icon: siCss } // Fixed import typo
                ]
            },
            {
                label: "Frameworks",
                items: [
                    { text: "React.js", color: "sky", icon: siReact },
                    { text: "Next.js", color: "purple", icon: siNextdotjs }
                ]
            },
            {
                label: "Styling/Animation",
                items: [
                    { text: "Tailwind CSS", color: "sky", icon: siTailwindcss },
                    { text: "Framer Motion", color: "purple", icon: siFramer }
                    // Removed Aceternity UI
                ]
            }
        ]
    },
    {
        title: "Cloud & Deployment",
        defaultIcon: IconCloud,
        descriptionSections: [
            {
                label: "Cloud Platforms",
                items: [
                    { text: "AWS", color: "yellow", icon: IconBrandAws },
                    { text: "Azure", color: "sky", icon: IconBrandAzure },
                    { text: "GCP", color: "red", icon: siGooglecloud }
                ]
            },
            {
                label: "Hosting",
                items: [
                    { text: "Render", color: "purple", icon: siRender },
                    { text: "Vercel", color: "indigo", icon: siVercel },
                    { text: "Netlify", color: "green", icon: siNetlify }
                ]
            },
            {
                label: "Tools",
                items: [
                    { text: "Git", color: "red", icon: siGit },
                    { text: "GitHub", color: "indigo", icon: siGithub }
                ]
            }
        ]
    },
    {
        title: "Core Fundamentals",
        defaultIcon: IconCode,
        descriptionSections: [
            {
                label: "Languages",
                items: [
                    { text: "Java", color: "red", icon: IconJava }, // Using custom Java SVG
                    { text: "C++", color: "sky", icon: siCplusplus }
                ]
            },
            {
                label: "Concepts",
                items: [
                    { text: "Data Structures (DSA)", color: "purple" },
                    { text: "OOP", color: "indigo" }
                ]
            }
        ]
    }
];

export default function SkillSection({ isDesktop }) {
    const itemsWithContent = skillItems.map(item => ({
        content: <SkillCardContent {...item} isDesktop={isDesktop} />
    }));

    return (
        // FIXED MOBILE: Replaced 'h-screen overflow-hidden' with 'min-h-screen py-12'. 
        // This acts exactly like h-screen on desktop, but allows safe scrolling on mobile!
        <section className="w-full min-h-screen bg-background py-6 px-4 md:px-10 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0.5, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
                    className="text-center mb-4" // Reduced from mb-6
                >
                    <h2 className="bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 bg-clip-text text-2xl font-bold font-heading tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)] md:text-4xl uppercase">
                        My Skills
                    </h2>
                    {/* FIXED: Removed hover instruction text & tuned light mode text color */}
                    <p className="mt-2 text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto text-center text-xs md:text-sm leading-relaxed">
                        The core technologies and architectural concepts I use to engineer scalable products and intelligent agents.
                    </p>
                </motion.div>

                <HoverEffect items={itemsWithContent} />
            </div>
        </section>
    );
}