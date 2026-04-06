import React from 'react'
import { motion as Motion } from 'framer-motion';
import ProjectCards from '../reusable/ProjectCards.jsx';
import NLP from '../assets/NLP_Robo.jpg';
import Agent from '../assets/AI_Agents.jpg';
import Civic from '../assets/Moile_On_Hand.jpg';

function ProjectsSection() {
    const content = [
        {
            title: 'NLP Sentiment Analysis',
            text: 'Analyze text with high-speed LLM cloud services to determine deep emotional context.',
            image: NLP,
            id: 1
        },
        {
            title: 'Agentic AI Honeypot',
            text: 'A honeypot for spammers which detects spam by itself and extracts the necessary details and information.',
            image: Agent,
            id: 2
        },
        {
            title: 'Civic Connect App',
            text: 'An app build for people to easily report problems and reach out to government.',
            image: Civic,
            id: 3
        },
    ]

    return (
        // 1. STRICT h-screen, no scrolling allowed
        <section className='flex h-screen w-full flex-col bg-background px-4 py-6 overflow-hidden'>

            {/* TOP: Header (shrink-0 means "do not squash me") */}
            <Motion.h1
                initial={{ opacity: 0.5, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                className="shrink-0 bg-linear-to-br from-slate-800 to-slate-500 dark:from-slate-300 dark:to-slate-500 py-2 bg-clip-text text-center text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.5)]"
            >
                MY PROJECTS
            </Motion.h1>

            {/* MIDDLE: Grid Area (flex-1 min-h-0 means "take exactly the remaining height, and force children to fit inside") */}
            <div className="flex w-full flex-1 items-center justify-center min-h-0 my-4">
                {/* The grid itself is told to be h-full so it spans the new flexible space */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-2 md:px-6 h-full pb-2">
                    {content.map((elem) => (
                        <div key={elem.id} className="flex justify-center h-full w-full">
                            <ProjectCards image={elem.image} text={elem.text} title={elem.title} />
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTTOM: Button (shrink-0) */}
            <div className="shrink-0 flex justify-center pb-2">
                <Motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    href='https://github.com/kaushlendra-pt-singh'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
                >
                    Visit GitHub
                </Motion.a>
            </div>

        </section>
    )
}

export default ProjectsSection