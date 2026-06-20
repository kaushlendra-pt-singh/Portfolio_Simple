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
        <section className='flex h-screen w-full flex-col bg-background px-4 py-6 overflow-hidden'>

            {/* Added dynamic dark mode drop shadow to the title */}
            <Motion.h1
                initial={{ opacity: 0.5, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                className="shrink-0 bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 py-2 bg-clip-text text-center text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_40px_rgba(203,213,225,0.4)]"
            >
                MY PROJECTS
            </Motion.h1>

            <div className="flex w-full flex-1 items-center justify-center min-h-0 my-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-2 md:px-6 h-full pb-2">
                    {content.map((elem) => (
                        <div key={elem.id} className="flex justify-center h-full w-full">
                            <ProjectCards image={elem.image} text={elem.text} title={elem.title} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="shrink-0 flex justify-center pb-2">
                <Motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    href='https://github.com/kaushlendra-pt-singh'
                    target="_blank"
                    rel="noopener noreferrer"
                    // The Ultimate Silver Button classes:
                    className="rounded-full bg-sky-500 dark:bg-slate-200/90 text-white dark:text-slate-900 px-8 py-3 font-body font-medium shadow-[0_0_20px_rgba(56,189,248,0.6)] dark:shadow-[0_0_20px_rgba(203,213,225,0.4)] transition-all hover:scale-105 hover:bg-sky-400 dark:hover:bg-slate-200 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] dark:hover:shadow-[0_0_40px_rgba(203,213,225,0.7)]"
                >
                    Visit GitHub
                </Motion.a>
            </div>

        </section>
    )
}

export default ProjectsSection