import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { HoverEffect } from '../components/ui/card-hover-effect.jsx';
import { Highlight } from './AboutSection.jsx';
// 1. Add IconCoffee here
import { 
    IconBrain, IconBrandAws, IconCloud, IconCode, 
    IconDatabase, IconLayout, IconServer, IconBrandAzure, 
    IconSchema, IconCpu, IconCoffee 
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


const SkillCardContent = ({ title, defaultIcon: DefaultIcon, descriptionSections, isDesktop }) => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const shouldAnimate = isDesktop !== undefined ? isDesktop : (typeof window !== 'undefined' && window.innerWidth >= 1024);

    // FIXED: Function to handle black icons (like Next.js, Vercel, GitHub) disappearing in dark mode
    const getIconColor = (hex) => {
        if (!hex) return 'currentColor';
        if (hex === '000000' || hex === '111111') return 'currentColor';
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
                    { text: "Java", color: "red", icon: IconCoffee }, // Fixed Java icon
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
        <section className="w-full min-h-screen bg-background py-12 px-4 md:px-10 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0.5, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
                    className="text-center mb-4" // Reduced from mb-6
                >
                    <h2 className="bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 bg-clip-text text-2xl font-bold font-heading tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)] md:text-4xl uppercase">
                        Technical Arsenal
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