import React from 'react'
import { motion as Motion } from 'framer-motion';
import ProjectCards from '../reusable/ProjectCards.jsx';
import NLP from '../assets/NLP_PINTREST.jpg';
import Agent from '../assets/AI_Agents.jpg';
import Civic from '../assets/Moile_On_Hand.jpg'

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
            text: 'An app build for people to easily report problems and reach out to governmetn.',
            image: Civic,
            id: 3
        },
    ]
    return (
        <div>
            <section className="relative flex h-screen w-full flex-col items-center justify-center bg-background px-4">

                <Motion.h1
                    initial={{ opacity: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                    // 1. Stacked drop-shadows: One tight & bright (20px), one wide & diffuse (60px)
                    className="bg-linear-to-br from-slate-800 to-slate-500 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-6xl font-heading tracking-tight text-transparent md:text-8xl drop-shadow-[0_0_60px_rgba(56,189,248,0.7)]"
                >
                    MY PROJECTS
                </Motion.h1>

                <Motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    href='https://github.com/kaushlendra-pt-singh'
                    // 2. Button shadow also boosted slightly to match the intense text glow
                    className="mt-8 target-blank rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:bg-sky-400 hover:cursor-pointer hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
                >
                    Visit GitHub
                </Motion.a>
            </section>
            <section className='flex min-h-screen w-full place-content-center bg-background px-4 py-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full'>
                    {
                        content.map((elem) => (
                            <div key={elem.id}>
                                <ProjectCards image={elem.image} text={elem.text} title={elem.title} />
                            </div>
                        ))
                    }
                </div>

            </section>
        </div>
    )
}

export default ProjectsSection
