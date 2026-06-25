import React from 'react'
import { motion as Motion } from 'framer-motion';
import { Highlight } from './AboutSection.jsx';
import GlowProjectCards from '../reusable/glow_ProjectCards.jsx';
import NLP from '../assets/NLP_Robo.jpg';
import Agent from '../assets/AI_Agents.jpg';
import Civic from '../assets/Moile_On_Hand.jpg';

function ProjectsSection({ isDesktop }) {
    const content = [
        {
            title: 'NLP Sentiment Analysis',
            text: 'Analyze deep sentiment of texts with high-speed LLM cloud services.',
            image: NLP,
            tags: ["Pyhton", "Groq", "Gemini", "AWS", "Azure"],
            stats: [
                <>Analyzed more than 120 text paragraphs.</>,
                <>Increased retrieval speed by <Highlight color='red'>82%</Highlight> using <Highlight color='red'>Redis</Highlight> compared to MongoDB.</>,
                <>Deployed on both <Highlight color='yellow'>AWS Lambda</Highlight> and <Highlight color='yellow'>Azure</Highlight></>
            ],
            tagColor: "sky",
            repoLink: "https://github.com/kaushlendra-pt-singh/NLP_Sentiment_Analysis",
            liveLink: "https://nlp-sentiment-analysis-tmkx.vercel.app/",
            id: 1
        },
        {
            title: 'Agentic AI Honeypot',
            text: 'A honeypot for spammers which detects spam and extracts the key details.',
            image: Agent,
            tags: ["Python", "FastAPI", "Groq", "Render"],
            stats: [
                <>A honeypot for spammers. Detects spam and extracts necessary info.</>,
                <>Powered by <Highlight color="sky">Groq LLMs</Highlight></>,
                <>Uses regex for custom information extraction.</>
            ],
            tagColor: "purple",
            repoLink: "https://github.com/kaushlendra-pt-singh/Agentic_AI_Honey_Pot",
            liveLink: "",
            id: 2
        },
        {
            title: 'Civic Connect App',
            text: 'An app build for people to easily report problems and reach out to government.',
            image: Civic,
            tags: ["JavaScript", "Node.js", "Firebase"],
            stats: [
                <>Features <Highlight color="purple">Google Cloud Vision</Highlight> and <Highlight color='green'>Twilio Api</Highlight></>,
                <>Uses <Highlight color='red'>Cloud Firebase</Highlight> for database.</>,
                <>Automatic AI image analyzation.</>,
            ],
            tagColor: "green",
            repoLink: "https://github.com/kaushlendra-pt-singh/civic-connnect-app",
            liveLink: "",
            id: 3
        },
    ]

    return (
        <section className={`flex w-full flex-col bg-background px-4 py-6 ${isDesktop ? 'h-full' : 'min-h-fit'}`}>

            {/* Title */}
            <Motion.h1
                initial={{ opacity: 0.5, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                className="shrink-0 bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 py-2 bg-clip-text text-center text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_40px_rgba(203,213,225,0.4)]"
            >
                MY PROJECTS
            </Motion.h1>

            {/* Cards grid */}
            <div className="flex w-full flex-1 items-center justify-center min-h-0 my-4">
                <div className={`grid w-full max-w-[95%] px-2 md:px-6 pb-2 gap-6
                    ${isDesktop ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full' : 'grid-cols-1'}`}
                >
                    {content.map((elem) => (
                        <div key={elem.id} className="flex justify-center h-full w-full">
                            <GlowProjectCards
                                image={elem.image}
                                text={elem.text}
                                title={elem.title}
                                repoLink={elem.repoLink}
                                liveLink={elem.liveLink}
                                stats={elem.stats}
                                tagColor={elem.tagColor}
                                tags={elem.tags}
                                isDesktop={isDesktop}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA buttons */}
            <div className="shrink-0 flex justify-center mb-5 gap-6 lg:gap-15">
                <Motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    href='https://github.com/kaushlendra-pt-singh'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-sky-500 dark:bg-slate-200/90 text-white dark:text-slate-900 px-8 py-3 font-body font-medium shadow-[0_0_20px_rgba(56,189,248,0.6)] dark:shadow-[0_0_20px_rgba(203,213,225,0.4)] transition-all hover:scale-105 hover:bg-sky-400 dark:hover:bg-slate-200 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] dark:hover:shadow-[0_0_30px_rgba(203,213,225,0.6)]"
                >
                    Visit GitHub
                </Motion.a>
            </div>

        </section>
    )
}

export default ProjectsSection